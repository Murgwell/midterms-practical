import { Link } from 'react-router-dom'
import { content } from '../data/content'
import { useCart } from '../hooks/useCart'
import QuantityStepper from '../components/QuantityStepper'
import { Money } from '../models/Money'

export default function CartPage() {
  const labels = content.cartPage
  const taxLabels = content.taxLabels
  const { cart, incrementItem, decrementItem, removeItem } = useCart()

  if (cart.isEmpty) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
        <span className="text-6xl" aria-hidden="true">
          🛒
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold text-stone-900 dark:text-stone-100">
          {labels.emptyTitle}
        </h1>
        <p className="mt-2 text-stone-500 dark:text-stone-400">{labels.emptySubtitle}</p>
        <Link
          to="/menu"
          className="mt-8 inline-block rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          {labels.browseMenuLabel}
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-stone-900 sm:text-4xl dark:text-stone-100">
          {labels.title}
        </h1>
        <p className="mt-2 text-stone-500 dark:text-stone-400">{labels.subtitle}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {cart.lines.map((line) => (
            <div
              key={line.id}
              className="flex flex-wrap items-center gap-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm dark:border-stone-700 dark:bg-stone-800 dark:shadow-none"
            >
              <Link
                to={`/menu/${line.id}`}
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-100 to-brand-200 text-3xl dark:from-stone-700 dark:to-stone-600"
              >
                <span aria-hidden="true">{line.menuItem.emoji}</span>
              </Link>
              <div className="min-w-0 flex-1">
                <Link to={`/menu/${line.id}`}>
                  <h2 className="font-semibold text-stone-900 transition hover:text-brand-700 dark:text-stone-100 dark:hover:text-brand-400">
                    {line.menuItem.name}
                  </h2>
                </Link>
                <p className="mt-0.5 text-sm text-stone-500 dark:text-stone-400">
                  {line.menuItem.formattedPrice}
                </p>
              </div>
              <QuantityStepper
                value={line.quantity}
                onIncrement={() => incrementItem(line.id)}
                onDecrement={() => decrementItem(line.id)}
                min={1}
              />
              <div className="w-24 text-right">
                <p className="text-sm text-stone-400 dark:text-stone-500">{labels.lineTotalLabel}</p>
                <p className="font-bold text-stone-900 dark:text-stone-100">
                  {line.formattedLineTotal}
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeItem(line.id)}
                className="text-xs font-semibold text-red-500 transition hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
              >
                {labels.removeLabel}
              </button>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-700 dark:bg-stone-800 dark:shadow-none">
          <h2 className="font-display text-xl font-bold text-stone-900 dark:text-stone-100">
            {labels.summaryTitle}
          </h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between text-stone-600 dark:text-stone-400">
              <dt>{labels.subtotalLabel}</dt>
              <dd className="font-medium text-stone-900 dark:text-stone-100">
                {cart.formattedSubtotal}
              </dd>
            </div>
            <div className="flex justify-between text-stone-600 dark:text-stone-400">
              <dt>{taxLabels.tax}</dt>
              <dd className="font-medium text-stone-900 dark:text-stone-100">
                {Money.format(cart.tax)}
              </dd>
            </div>
            <div className="flex justify-between text-stone-600 dark:text-stone-400">
              <dt>{taxLabels.serviceFee}</dt>
              <dd className="font-medium text-stone-900 dark:text-stone-100">
                {Money.format(cart.serviceFee)}
              </dd>
            </div>
            <div className="flex justify-between border-t border-stone-100 pt-3 text-base font-bold text-stone-900 dark:border-stone-700 dark:text-stone-100">
              <dt>{taxLabels.totalLabel}</dt>
              <dd className="text-brand-700 dark:text-brand-400">{cart.formattedTotal}</dd>
            </div>
          </dl>
          <p className="mt-2 text-xs text-stone-400 dark:text-stone-500">{taxLabels.note}</p>

          <div className="mt-6 space-y-3">
            <Link
              to="/checkout"
              className="block rounded-full bg-brand-600 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              {labels.continueToCheckoutLabel}
            </Link>
            <Link
              to="/menu"
              className="block rounded-full border border-stone-200 px-6 py-3 text-center text-sm font-semibold text-stone-600 transition hover:border-brand-300 hover:text-brand-700 dark:border-stone-600 dark:text-stone-300 dark:hover:border-brand-400 dark:hover:text-brand-400"
            >
              {labels.keepShoppingLabel}
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
