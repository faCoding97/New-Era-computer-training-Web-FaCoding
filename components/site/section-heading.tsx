export function SectionHeading({ eyebrow, title, text, center = false }: { eyebrow?: string; title: string; text?: string; center?: boolean }) {
  return (
    <div className={center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow ? <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-secondary">{eyebrow}</p> : null}
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h2>
      {text ? <p className="mt-4 text-lg leading-8 text-gray-600">{text}</p> : null}
    </div>
  );
}
