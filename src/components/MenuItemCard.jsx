import { Link } from 'react-router-dom'
import { content } from '../data/content'

export default function MenuItemCard({ item, onAdd }) {
  const labels = content.menuPage

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-stone-700 dark:bg-stone-800 dark:shadow-none">
      <Link
        to={`/menu/${item.id}`}
        className="flex h-40 items-center justify-center bg-gradient-to-br from-brand-100 to-brand-200 text-6xl transition group-hover:scale-105 dark:from-stone-700 dark:to-stone-600"
      >
        <span aria-hidden="true">{item.emoji}</span>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/menu/${item.id}`}>
            <h3 className="font-semibold leading-snug text-stone-900 transition group-hover:text-brand-700 dark:text-stone-100 dark:group-hover:text-brand-400">
              {item.name}
            </h3>
          </Link>
          <span className="shrink-0 text-sm font-bold text-brand-700 dark:text-brand-400">
            {item.formattedPrice}
          </span>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
          {item.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700 dark:bg-stone-700 dark:text-brand-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400">
            <span className="font-medium text-amber-600">★ {item.displayRating}</span>
            <span>
              {labels.prepTimeLabel}: {item.prepTimeMinutes} {labels.minsLabel}
            </span>
          </div>
          {item.isAvailable ? (
            <button
              type="button"
              onClick={() => onAdd(item)}
              className="rounded-full bg-brand-600 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-brand-700 active:scale-95"
            >
              {labels.addToCartLabel}
            </button>
          ) : (
            <span className="rounded-full bg-stone-100 px-4 py-1.5 text-xs font-medium text-stone-400 dark:bg-stone-700 dark:text-stone-400">
              {labels.unavailableLabel}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
