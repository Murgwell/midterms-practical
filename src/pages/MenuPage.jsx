import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { categories } from '../data/categories'
import { content } from '../data/content'
import { menuItems } from '../data/menuItems'
import { useCart } from '../hooks/useCart'
import MenuItemCard from '../components/MenuItemCard'
import { Money } from '../models/Money'
import { MenuItem } from '../models/MenuItem'

const PRICE_CEILING = Math.ceil(Math.max(...menuItems.map((item) => item.price)) / 50) * 50

export default function MenuPage() {
  const labels = content.menuPage
  const { addItem } = useCart()
  const [searchParams, setSearchParams] = useSearchParams()

  const categoryFromUrl = searchParams.get('category') ?? 'all'
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState(
    categories.some((category) => category.id === categoryFromUrl) ? categoryFromUrl : 'all',
  )
  const [sortKey, setSortKey] = useState('featured')
  const [selectedTags, setSelectedTags] = useState([])
  const [maxPrice, setMaxPrice] = useState(PRICE_CEILING)

  const filteredItems = useMemo(() => {
    const filtered = menuItems.filter(
      (item) =>
        item.isInCategory(activeCategory) &&
        item.matchesSearch(query) &&
        item.matchesAnyTag(selectedTags) &&
        item.isPricedAtMost(maxPrice),
    )
    return MenuItem.sortBy(filtered, sortKey)
  }, [query, activeCategory, selectedTags, maxPrice, sortKey])

  function chooseCategory(categoryId) {
    setActiveCategory(categoryId)
    if (categoryId === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ category: categoryId })
    }
  }

  function toggleTag(tag) {
    setSelectedTags((previous) =>
      previous.includes(tag) ? previous.filter((value) => value !== tag) : [...previous, tag],
    )
  }

  function resetFilters() {
    setQuery('')
    chooseCategory('all')
    setSelectedTags([])
    setMaxPrice(PRICE_CEILING)
    setSortKey('featured')
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-stone-900 sm:text-4xl dark:text-stone-100">
          {labels.title}
        </h1>
        <p className="mt-2 text-stone-500 dark:text-stone-400">{labels.subtitle}</p>
        <Link
          to="/full-menu"
          className="mt-3 inline-block text-sm font-semibold text-brand-600 transition hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
        >
          {labels.viewGroupedLabel} →
        </Link>
      </div>

      <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:p-5 dark:border-stone-700 dark:bg-stone-800 dark:shadow-none">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-stone-400">
              🔍
            </span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={labels.searchPlaceholder}
              className="w-full rounded-xl border border-stone-200 bg-stone-50 py-2.5 pr-4 pl-10 text-sm text-stone-900 outline-none transition focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-brand-500 dark:focus:bg-stone-900 dark:focus:ring-stone-700"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-sm font-medium text-stone-600 dark:text-stone-300">
              {labels.sortLabel}
              <select
                value={sortKey}
                onChange={(event) => setSortKey(event.target.value)}
                className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:focus:border-brand-500 dark:focus:ring-stone-700"
              >
                {labels.sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex items-center gap-2 text-sm font-medium text-stone-600 dark:text-stone-300">
              {labels.priceLabel}
              <select
                value={maxPrice}
                onChange={(event) => setMaxPrice(Number(event.target.value))}
                className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:focus:border-brand-500 dark:focus:ring-stone-700"
              >
                {[50, 100, 150, 200, 250, PRICE_CEILING].map((price) => (
                  <option key={price} value={price}>
                    {price >= PRICE_CEILING ? labels.priceLabel : Money.format(price)}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => chooseCategory('all')}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              activeCategory === 'all'
                ? 'bg-brand-600 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-brand-50 hover:text-brand-700 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-stone-600 dark:hover:text-white'
            }`}
          >
            {labels.allCategoriesLabel}
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => chooseCategory(category.id)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                activeCategory === category.id
                  ? 'bg-brand-600 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-brand-50 hover:text-brand-700 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-stone-600 dark:hover:text-white'
              }`}
            >
              <span aria-hidden="true">{category.emoji}</span> {category.name}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-stone-100 pt-4 dark:border-stone-700">
          <span className="text-xs font-semibold tracking-wide text-stone-400 uppercase dark:text-stone-500">
            {labels.tagsLabel}
          </span>
          {[...new Set(menuItems.flatMap((item) => item.tags))].sort().map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                selectedTags.includes(tag)
                  ? 'border-brand-500 bg-brand-50 text-brand-700 dark:border-brand-400 dark:bg-stone-700 dark:text-brand-300'
                  : 'border-stone-200 text-stone-500 hover:border-brand-300 dark:border-stone-600 dark:text-stone-400 dark:hover:border-brand-400'
              }`}
            >
              {tag}
            </button>
          ))}
          {selectedTags.length > 0 && (
            <button
              type="button"
              onClick={() => setSelectedTags([])}
              className="text-xs font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
            >
              {labels.clearTagsLabel}
            </button>
          )}
        </div>
      </div>

      <p className="mt-6 text-sm text-stone-500 dark:text-stone-400">
        {labels.resultCountLabel
          .replace('{shown}', String(filteredItems.length))
          .replace('{total}', String(menuItems.length))}
      </p>

      {filteredItems.length > 0 ? (
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <MenuItemCard key={item.id} item={item} onAdd={addItem} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-stone-300 bg-white p-12 text-center dark:border-stone-600 dark:bg-stone-800">
          <span className="text-5xl" aria-hidden="true">
            🍽️
          </span>
          <h2 className="mt-4 font-display text-xl font-bold text-stone-900 dark:text-stone-100">
            {labels.emptyTitle}
          </h2>
          <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
            {labels.emptySubtitle}
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-6 rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            {labels.resetLabel}
          </button>
        </div>
      )}
    </div>
  )
}
