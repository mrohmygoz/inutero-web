import Nav from "@/app/_components/Nav";
import Footer from "@/app/_components/Footer";
import type { Locale } from "@/app/_lib/i18n";

// Nav renders position:fixed for its mobile menu overlay, irrelevant here
// since the menu only opens on interaction — these specimens show the closed
// bar in both themes.
export default function ShellSpecimens({ locale = "en" }: { locale?: Locale }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="border border-(--opacity-neutral-darkest-20)">
        <p className="border-b border-(--opacity-neutral-darkest-20) px-4 py-2 font-body text-body-s text-(--color-basic-text-secondary)">
          Nav — theme=&quot;light&quot;
        </p>
        <Nav locale={locale} theme="light" />
      </div>

      <div className="border border-(--opacity-neutral-darkest-20) bg-(--color-basic-accent)">
        <p className="border-b border-(--opacity-white-20) px-4 py-2 font-body text-body-s text-(--opacity-white-60)">
          Nav — theme=&quot;dark&quot;
        </p>
        <Nav locale={locale} theme="dark" />
      </div>

      <div className="border border-(--opacity-neutral-darkest-20)">
        <p className="border-b border-(--opacity-neutral-darkest-20) px-4 py-2 font-body text-body-s text-(--color-basic-text-secondary)">
          Footer
        </p>
        <Footer locale={locale} />
      </div>
    </div>
  );
}
