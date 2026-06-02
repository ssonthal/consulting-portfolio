import { cn } from "@/lib/cn";

export function PageHero({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "mesh-dark border-b border-white/10 py-16 md:py-24",
        className,
      )}
    >
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-400">{description}</p>
      </div>
    </section>
  );
}
