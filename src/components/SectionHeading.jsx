export default function SectionHeading({ title, subtitle, action }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="font-display text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
          {title}
        </h2>
        {subtitle && <p className="mt-1 text-stone-500 dark:text-stone-400">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}
