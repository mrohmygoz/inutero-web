import Image from "next/image";

// Source: desktop symbol 12610:6405 (284px wide, right-border, pr-[21px]). Mobile
// occurrence 12217:886 (same 284px width, pr-[11px], slightly shorter image) —
// trivial (Close-tier) padding drift, desktop definition kept canonical (design.md
// Derived Sources). Presentational shell only (D-C).
export default function TeamCard({
  name,
  role,
  bio,
  image,
  className,
}: {
  name: string;
  role: string;
  bio: string;
  image: { src: string; alt: string };
  className?: string;
}) {
  return (
    <div
      className={`flex w-[284px] flex-col items-start gap-5 border-r border-solid border-(--color-basic-border) pr-[21px] ${className ?? ""}`.trim()}
    >
      <div className="relative h-[368px] w-full shrink-0">
        <Image src={image.src} alt={image.alt} fill className="object-cover" />
      </div>
      <div className="flex w-full flex-col items-start">
        <p className="font-display text-display-h7 w-full [word-break:break-word] font-bold uppercase text-(--color-basic-text-primary)">
          {name}
        </p>
        <p className="font-body text-label-m w-full pt-1 font-normal uppercase text-(--color-basic-text-secondary)">
          {role}
        </p>
      </div>
      <p className="font-body text-body-s w-full text-(--color-basic-text-secondary)">{bio}</p>
    </div>
  );
}
