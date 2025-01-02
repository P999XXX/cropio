export const ColorsSection = () => {
  const colorSections = [
    {
      title: "Primary",
      colors: [
        { name: "Default", class: "bg-primary text-primary-foreground" },
        { name: "Hover", class: "bg-primary-hover text-primary-foreground" },
      ]
    },
    {
      title: "Secondary",
      colors: [
        { name: "Default", class: "bg-secondary text-secondary-foreground" },
        { name: "Hover", class: "bg-secondary-hover text-secondary-foreground" },
      ]
    },
    {
      title: "Success",
      colors: [
        { name: "Default", class: "bg-success text-success-foreground" },
        { name: "Hover", class: "bg-success-hover text-success-foreground" },
      ]
    },
    {
      title: "Destructive",
      colors: [
        { name: "Default", class: "bg-destructive text-destructive-foreground" },
        { name: "Hover", class: "bg-destructive-hover text-destructive-foreground" },
      ]
    },
    {
      title: "Warning",
      colors: [
        { name: "Default", class: "bg-warning text-warning-foreground" },
        { name: "Hover", class: "bg-warning-hover text-warning-foreground" },
      ]
    },
    {
      title: "Accent",
      colors: [
        { name: "Default", class: "bg-accent text-accent-foreground" },
        { name: "Hover", class: "bg-accent-hover text-accent-foreground" },
      ]
    },
    {
      title: "Muted",
      colors: [
        { name: "Default", class: "bg-muted text-muted-foreground" },
        { name: "Hover", class: "bg-muted-hover text-muted-foreground" },
      ]
    },
    {
      title: "System",
      colors: [
        { name: "Background", class: "bg-background text-foreground border" },
        { name: "Foreground", class: "bg-foreground text-background" },
        { name: "Card", class: "bg-card text-card-foreground border" },
        { name: "Popover", class: "bg-popover text-popover-foreground border" },
        { name: "Border", class: "bg-border" },
        { name: "Input", class: "bg-input" },
        { name: "Ring", class: "bg-ring text-background" },
      ]
    }
  ];

  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-semibold">Colors</h2>
      <div className="grid gap-8">
        {colorSections.map((section) => (
          <div key={section.title} className="space-y-4">
            <h3 className="text-xl font-medium">{section.title}</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {section.colors.map((color) => (
                <div
                  key={color.name}
                  className="space-y-1.5"
                >
                  <div
                    className={`h-16 w-full rounded-lg ${color.class} flex items-center justify-center`}
                  >
                    <span className="font-medium">{color.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};