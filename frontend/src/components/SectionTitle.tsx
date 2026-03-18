type SectionTitleProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export default function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
  return (
    <div className="max-w-2xl space-y-3">
      <p className="text-sm font-semibold uppercase leading-[1.5] tracking-[0.22em] text-primary/70">{eyebrow}</p>
      <h2 className="text-3xl font-bold leading-[1.15] text-slate-900 md:text-4xl">{title}</h2>
      {description ? <p className="text-base leading-7 text-slate-600">{description}</p> : null}
    </div>
  );
}
