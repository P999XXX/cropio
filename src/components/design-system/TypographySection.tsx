export const TypographySection = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Typography</h2>
      <div className="space-y-4">
        <div>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Heading 1
          </h1>
          <p className="text-muted-foreground">Font size: 3rem (48px) / Line height: 3.5rem (56px)</p>
        </div>
        <div>
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Heading 2
          </h2>
          <p className="text-muted-foreground">Font size: 2.25rem (36px) / Line height: 2.5rem (40px)</p>
        </div>
        <div>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Heading 3
          </h3>
          <p className="text-muted-foreground">Font size: 1.875rem (30px) / Line height: 2.25rem (36px)</p>
        </div>
        <div>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            This is a paragraph of text. The quick brown fox jumps over the lazy dog.
            This text demonstrates the standard paragraph styling with good readability
            and proper line height.
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">
            This is small text with muted color, perfect for captions or supporting text.
          </p>
        </div>
      </div>
    </section>
  );
};