type DashboardHeaderProps = {
  heading: string;
  description?: string;
  children?: React.ReactNode;
};

export const DashboardHeader = ({
  heading,
  description,
  children,
}: DashboardHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="grid gap-4">
        <h1 className="text-2xl font-semibold md:text-3xl">{heading}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
};
