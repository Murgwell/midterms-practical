import { Link } from 'react-router-dom'
import { content } from '../data/content'

export default function NotFoundPage() {
  const labels = content.notFound

  return (
    <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
      <span className="text-6xl" aria-hidden="true">
        🦆
      </span>
      <h1 className="mt-4 font-display text-3xl font-bold text-stone-900 dark:text-stone-100">
        {labels.title}
      </h1>
      <p className="mt-2 text-stone-500 dark:text-stone-400">{labels.subtitle}</p>
      <Link
        to="/"
        className="mt-8 inline-block rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
      >
        {labels.homeLabel}
      </Link>
    </div>
  )
}
