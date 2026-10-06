import { createHash } from "node:crypto";
import { head, put } from "@vercel/blob";
import Redis from "ioredis";
import { NextResponse } from "next/server";
import { isValidEmail } from "../../_components/emailValidation";

// Node.js runtime required: ioredis connects over TCP, which the Edge runtime cannot do.
export const runtime = "nodejs";

const RATE_LIMIT_KEY = "newsletter:ratelimit";
const RATE_LIMIT_WINDOW_MS = 1000;

let redis: Redis | undefined;

function getRedis(): Redis {
  // Bounded retry/connect behavior: ioredis's defaults retry forever, which would hang
  // the request indefinitely on a Redis outage instead of failing fast with a 5xx.
  if (!redis) {
    redis = new Redis(process.env.REDIS_URL!, {
      connectTimeout: 2000,
      maxRetriesPerRequest: 1,
      retryStrategy: () => null,
    });
    redis.on("error", () => {});
  }
  return redis;
}

function pathnameFor(email: string): string {
  const hash = createHash("sha256").update(email.toLowerCase()).digest("hex");
  return `newsletter/${hash}.json`;
}

export async function POST(request: Request) {
  let email: unknown;
  try {
    const body = await request.json();
    email = body?.email;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (typeof email !== "string" || !isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const pathname = pathnameFor(email);

  try {
    const existing = await head(pathname).catch(() => null);
    if (existing) {
      return NextResponse.json({ ok: true });
    }

    const accepted = await getRedis().set(
      RATE_LIMIT_KEY,
      "1",
      "PX",
      RATE_LIMIT_WINDOW_MS,
      "NX",
    );
    if (accepted !== "OK") {
      return NextResponse.json({ error: "Rate limited" }, { status: 429 });
    }

    await put(
      pathname,
      JSON.stringify({ email, timestamp: new Date().toISOString() }),
      {
        access: "private",
        addRandomSuffix: false,
        contentType: "application/json",
      },
    );

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Persistence failed" }, { status: 500 });
  }
}
