import { Link } from 'react-router-dom'
import { content } from '../data/content'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-brand-100 bg-white dark:border-stone-800 dark:bg-stone-900">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden="true">
              {content.brand.emoji}
            </span>
            <span className="font-display text-lg font-bold text-brand-800 dark:text-brand-400">
              {content.brand.name}
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-stone-500 dark:text-stone-400">
            {content.footer.description}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
            {content.footer.menuTitle}
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {content.nav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-stone-500 transition hover:text-brand-600 dark:text-stone-400 dark:hover:text-brand-400"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
            {content.footer.contactTitle}
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-stone-500 dark:text-stone-400">
            <li>{content.footer.phone}</li>
            <li>{content.footer.email}</li>
            <li>{content.footer.address}</li>
          </ul>
          <h3 className="mt-6 text-sm font-semibold text-stone-900 dark:text-stone-100">
            {content.footer.hoursTitle}
          </h3>
          <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">{content.footer.hours}</p>
        </div>
      </div>
      <div className="border-t border-stone-100 py-4 text-center text-xs text-stone-400 dark:border-stone-800 dark:text-stone-500">
        {content.footer.rights}
      </div>
    </footer>
  )
}
