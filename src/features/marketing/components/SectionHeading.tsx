export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-content text-center">
      <p className="text-label tracking-wide text-primary uppercase">{eyebrow}</p>
      <h2 className="mt-3 text-display">{title}</h2>
      {description && <p className="mt-4 text-muted-foreground">{description}</p>}
    </div>
  );
}
