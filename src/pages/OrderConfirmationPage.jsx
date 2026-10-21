import { Link, useParams } from 'react-router-dom'
import { content } from '../data/content'
import { useCart } from '../hooks/useCart'
import { Money } from '../models/Money'

export default function OrderConfirmationPage() {
  const { orderId } = useParams()
  const labels = content.confirmationPage
  const taxLabels = content.taxLabels
  const { getOrder } = useCart()
  const order = getOrder(orderId)

  if (!order) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
        <span className="text-6xl" aria-hidden="true">
          🔎
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold text-stone-900 dark:text-stone-100">
          {labels.missingTitle}
        </h1>
        <p className="mt-2 text-stone-500 dark:text-stone-400">{labels.missingSubtitle}</p>
        <Link
          to="/menu"
          className="mt-8 inline-block rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          {labels.continueShoppingLabel}
        </Link>
      </div>
    )
  }

  const paymentLabel =
    content.checkoutPage.paymentOptions.find((option) => option.value === order.paymentMethod)
      ?.label ?? order.paymentMethod

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="rounded-3xl border border-green-200 bg-gradient-to-br from-green-50 to-white p-8 text-center shadow-sm sm:p-12 dark:border-green-900/50 dark:from-green-950/40 dark:to-stone-800 dark:shadow-none">
        <span className="text-6xl" aria-hidden="true">
          ✅
        </span>
        <p className="mt-4 text-sm font-semibold tracking-wide text-green-700 uppercase dark:text-green-400">
          {labels.eyebrow}
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-stone-900 dark:text-stone-100">
          {labels.titleTemplate.replace('{name}', order.customer.firstName)}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-stone-500 dark:text-stone-400">{labels.subtitle}</p>

        <div className="mt-8 grid gap-4 rounded-2xl bg-white p-6 text-left shadow-sm sm:grid-cols-2 dark:bg-stone-900 dark:shadow-none">
          <div>
            <p className="text-xs font-semibold tracking-wide text-stone-400 uppercase dark:text-stone-500">
              {labels.orderIdLabel}
            </p>
            <p className="mt-1 font-mono text-lg font-bold text-brand-700 dark:text-brand-400">
              {order.id}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wide text-stone-400 uppercase dark:text-stone-500">
              {labels.placedAtLabel}
            </p>
            <p className="mt-1 text-sm font-semibold text-stone-800 dark:text-stone-200">
              {order.formattedPlacedAt}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wide text-stone-400 uppercase dark:text-stone-500">
              {labels.statusLabel}
            </p>
            <p className="mt-1">
              <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                {content.statusLabels[order.status]}
              </span>
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wide text-stone-400 uppercase dark:text-stone-500">
              {content.checkoutPage.paymentTitle}
            </p>
            <p className="mt-1 text-sm font-semibold text-stone-800 dark:text-stone-200">
              {paymentLabel}
            </p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-xs font-semibold tracking-wide text-stone-400 uppercase dark:text-stone-500">
              {labels.addressLabel}
            </p>
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
              {order.customer.fullName} · {order.customer.address}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8 dark:border-stone-700 dark:bg-stone-800 dark:shadow-none">
        <h2 className="font-display text-xl font-bold text-stone-900 dark:text-stone-100">
          {labels.itemsTitle}
        </h2>
        <ul className="mt-4 divide-y divide-stone-100 dark:divide-stone-700">
          {order.lines.map((line) => (
            <li key={line.name} className="flex items-center justify-between gap-4 py-3">
              <span className="text-sm text-stone-700 dark:text-stone-300">
                <span aria-hidden="true">{line.emoji}</span> {line.name}{' '}
                <span className="text-stone-400 dark:text-stone-500">×{line.quantity}</span>
              </span>
              <span className="shrink-0 text-sm font-semibold text-stone-900 dark:text-stone-100">
                {Money.format(line.lineTotal)}
              </span>
            </li>
          ))}
        </ul>
        <dl className="mt-4 space-y-2 border-t border-stone-100 pt-4 text-sm dark:border-stone-700">
          <div className="flex justify-between text-stone-600 dark:text-stone-400">
            <dt>{content.cartPage.subtotalLabel}</dt>
            <dd>{Money.format(order.subtotal)}</dd>
          </div>
          <div className="flex justify-between text-stone-600 dark:text-stone-400">
            <dt>{taxLabels.tax}</dt>
            <dd>{Money.format(order.tax)}</dd>
          </div>
          <div className="flex justify-between text-stone-600 dark:text-stone-400">
            <dt>{taxLabels.serviceFee}</dt>
            <dd>{Money.format(order.serviceFee)}</dd>
          </div>
          <div className="flex justify-between pt-2 text-base font-bold text-stone-900 dark:text-stone-100">
            <dt>{labels.totalLabel}</dt>
            <dd className="text-brand-700 dark:text-brand-400">{order.formattedTotal}</dd>
          </div>
        </dl>

        <Link
          to="/menu"
          className="mt-8 block rounded-full bg-brand-600 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          {labels.continueShoppingLabel}
        </Link>
      </div>
    </div>
  )
}
