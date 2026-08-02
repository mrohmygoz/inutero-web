import Cms from "@/app/_components/Cms";
import NewsletterSignup from "@/app/_components/NewsletterSignup";
import ShareRow from "@/app/_components/ShareRow";
import UniversalCTA from "@/app/_components/UniversalCTA";
import type { Locale } from "@/app/_lib/i18n";

// A hand-written stand-in for a compiled MDX body, so the CMS specimen does not depend
// on the content directory. It exercises every element the design defines (paragraph,
// heading, figure + caption, blockquote) plus two derived ones (list, link).
type CmsElementMap = Parameters<typeof Cms>[0]["body"] extends React.ComponentType<infer P>
  ? P extends { components?: infer C }
    ? C
    : never
  : never;

function SampleBody({ components }: { components?: CmsElementMap }) {
  const c = (components ?? {}) as Record<string, React.ElementType>;
  const P = c.p ?? "p";
  const H2 = c.h2 ?? "h2";
  const Img = c.img ?? "img";
  const Quote = c.blockquote ?? "blockquote";
  const Ul = c.ul ?? "ul";
  const Li = c.li ?? "li";
  const A = c.a ?? "a";

  return (
    <>
      <P>
        Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi
        eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit.
      </P>
      <Img
        src="/images/content/sample-live.jpg"
        alt="Band performing to a full room"
        title="Image caption goes here"
      />
      <H2>Dolor enim eu tortor urna sed duis nulla</H2>
      <P>
        Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet commodo
        consectetur convallis risus. Sed condimentum enim dignissim adipiscing faucibus
        consequat, urna.
      </P>
      <Quote>
        <P>
          &quot;Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id. Non
          pellentesque congue eget consectetur turpis.&quot;
        </P>
      </Quote>
      <Ul>
        <Li>Derived list styling — no Figma reference</Li>
        <Li>
          Derived <A href="#">link styling</A>, also no reference
        </Li>
      </Ul>
    </>
  );
}

function Frame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border border-(--opacity-neutral-darkest-20)">
      <p className="font-body text-body-s border-b border-(--opacity-neutral-darkest-20) px-4 py-2 text-(--color-basic-text-secondary)">
        {label}
      </p>
      {children}
    </div>
  );
}

export default function BlockSpecimens({ locale = "en" }: { locale?: Locale }) {
  return (
    // These are full-bleed sections in the design (1440px wide at desktop). The
    // styleguide's own max-w-(--container-large) would crop them, so they break out to
    // the true viewport width — otherwise the 288px UniversalCTA heading appears to
    // overflow when it actually fits its designed frame.
    <div className="mx-[calc(50%-50vw)] flex w-screen flex-col gap-6">
      <Frame label="UniversalCTA">
        <UniversalCTA locale={locale} href={`/${locale}/contact`} />
      </Frame>

      <Frame label='NewsletterSignup — no `action` (inert, D-F)'>
        <NewsletterSignup locale={locale} />
      </Frame>

      <Frame label="Cms — article body only; the desktop left share rail in 12610:7361 is Phase 11/14 page chrome">
        <Cms body={SampleBody} />
      </Frame>

      <Frame label="ShareRow — sits below the body; third glyph is the rail's X, not the row's YouTube (D031)">
        <ShareRow locale={locale} title="Sample article title" />
      </Frame>
    </div>
  );
}
