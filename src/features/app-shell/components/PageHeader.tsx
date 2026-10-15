type PageHeaderProps = {
  title: string;
  description?: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div>
      <h1 className="text-title">{title}</h1>
      {description && <p className="mt-1 text-caption text-muted-foreground">{description}</p>}
    </div>
  );
}
