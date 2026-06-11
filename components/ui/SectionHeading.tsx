import { Reveal } from "./Reveal";

export function SectionHeading({
  label,
  title,
  desc,
  align = "left",
}: {
  label: string;
  title: React.ReactNode;
  desc?: string;
  align?: "left" | "center";
}) {
  const alignCls = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <Reveal className={`flex flex-col ${alignCls} mb-16 md:mb-20`}>
      <div className="section-label mb-5">{label}</div>
      <h2 className="heading-tight text-4xl md:text-5xl lg:text-6xl font-semibold max-w-3xl">{title}</h2>
      {desc && <p className="mt-5 text-base md:text-lg text-text-3 leading-relaxed max-w-xl">{desc}</p>}
    </Reveal>
  );
}
