import { Link } from 'react-router-dom'
import { categories } from '../data/categories'
import { content } from '../data/content'
import { menuItems } from '../data/menuItems'
import { useCart } from '../hooks/useCart'
import MenuItemCard from '../components/MenuItemCard'

export default function FullMenuPage() {
  const labels = content.fullMenuPage
  const { addItem } = useCart()

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-stone-900 sm:text-4xl dark:text-stone-100">
          {labels.title}
        </h1>
        <p className="mt-2 text-stone-500 dark:text-stone-400">{labels.subtitle}</p>
        <Link
          to="/menu"
          className="mt-3 inline-block text-sm font-semibold text-brand-600 transition hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
        >
          {labels.backToFilterLabel} →
        </Link>
      </div>

      {categories.map((category) => {
        const items = menuItems.filter((item) => item.isInCategory(category.id))
        return (
          <section key={category.id} className="mt-10 first:mt-0">
            <div className="flex items-center gap-3 border-b-2 border-brand-100 pb-3 dark:border-stone-700">
              <span className="text-3xl" aria-hidden="true">
                {category.emoji}
              </span>
              <div className="min-w-0">
                <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-stone-100">
                  {category.name}
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400">{category.description}</p>
              </div>
              <span className="ml-auto shrink-0 rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-500 dark:bg-stone-700 dark:text-stone-300">
                {labels.dishesCountLabel.replace('{count}', String(items.length))}
              </span>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <MenuItemCard key={item.id} item={item} onAdd={addItem} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
