import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { content } from '../data/content'
import { menuItems } from '../data/menuItems'
import { useCart } from '../hooks/useCart'
import MenuItemCard from '../components/MenuItemCard'
import QuantityStepper from '../components/QuantityStepper'

export default function DishDetailPage() {
  const { itemId } = useParams()
  const labels = content.dishPage
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const item = menuItems.find((candidate) => candidate.id === itemId)

  if (!item) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
        <span className="text-6xl" aria-hidden="true">
          🍽️
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold text-stone-900 dark:text-stone-100">
          {labels.notFoundTitle}
        </h1>
        <p className="mt-2 text-stone-500 dark:text-stone-400">{labels.notFoundSubtitle}</p>
        <Link
          to="/menu"
          className="mt-8 inline-block rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          {labels.backLabel}
        </Link>
      </div>
    )
  }

  const related = menuItems
    .filter((candidate) => candidate.categoryId === item.categoryId && candidate.id !== item.id)
    .slice(0, 3)

  function handleAdd() {
    addItem(item, quantity)
    setAdded(true)
    setQuantity(1)
    window.setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link
        to="/menu"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
      >
        ← {labels.backLabel}
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div className="flex h-72 items-center justify-center rounded-3xl bg-gradient-to-br from-brand-100 to-brand-200 text-9xl sm:h-96 dark:from-stone-700 dark:to-stone-600">
          <span aria-hidden="true">{item.emoji}</span>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            {item.isAvailable ? (
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-300">
                {content.menuPage.availableLabel}
              </span>
            ) : (
              <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-500 dark:bg-stone-700 dark:text-stone-400">
                {content.menuPage.unavailableLabel}
              </span>
            )}
            <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
              ★ {item.displayRating}
            </span>
          </div>

          <h1 className="mt-3 font-display text-3xl font-bold text-stone-900 sm:text-4xl dark:text-stone-100">
            {item.name}
          </h1>
          <p className="mt-3 leading-relaxed text-stone-600 dark:text-stone-300">
            {item.description}
          </p>

          <p className="mt-5 font-display text-3xl font-bold text-brand-700 dark:text-brand-400">
            {item.formattedPrice}
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-4 rounded-2xl bg-stone-50 p-4 text-sm dark:bg-stone-800">
            <div>
              <dt className="text-stone-400 dark:text-stone-500">{labels.prepTimeLabel}</dt>
              <dd className="mt-0.5 font-semibold text-stone-800 dark:text-stone-100">
                {item.prepTimeMinutes} {content.menuPage.minsLabel}
              </dd>
            </div>
            <div>
              <dt className="text-stone-400 dark:text-stone-500">{labels.caloriesLabel}</dt>
              <dd className="mt-0.5 font-semibold text-stone-800 dark:text-stone-100">
                {item.calories} kcal
              </dd>
            </div>
          </dl>

          <div className="mt-6">
            <h2 className="text-xs font-semibold tracking-wide text-stone-400 uppercase dark:text-stone-500">
              {labels.tagsTitle}
            </h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 dark:bg-stone-700 dark:text-brand-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div>
              <p className="mb-1.5 text-xs font-semibold tracking-wide text-stone-400 uppercase dark:text-stone-500">
                {labels.quantityLabel}
              </p>
              <QuantityStepper
                value={quantity}
                onIncrement={() => setQuantity((value) => value + 1)}
                onDecrement={() => setQuantity((value) => Math.max(1, value - 1))}
              />
            </div>
            <button
              type="button"
              disabled={!item.isAvailable}
              onClick={handleAdd}
              className="mt-5 rounded-full bg-brand-600 px-8 py-3 font-semibold text-white shadow-lg shadow-brand-200 transition hover:bg-brand-700 active:scale-95 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:shadow-none dark:shadow-none dark:disabled:bg-stone-700 dark:disabled:text-stone-500"
            >
              {added ? labels.addedLabel : labels.addToCartLabel}
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-stone-100">
            {labels.goesWellTitle}
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((candidate) => (
              <MenuItemCard key={candidate.id} item={candidate} onAdd={addItem} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
