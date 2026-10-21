import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { content } from '../data/content'
import { useCart } from '../hooks/useCart'
import { Money } from '../models/Money'

export default function CheckoutPage() {
  const labels = content.checkoutPage
  const taxLabels = content.taxLabels
  const { cart, placeOrder } = useCart()
  const navigate = useNavigate()

  const [values, setValues] = useState(() =>
    Object.fromEntries(labels.fields.map((field) => [field.name, ''])),
  )
  const [paymentMethod, setPaymentMethod] = useState(labels.paymentOptions[0].value)
  const [touched, setTouched] = useState({})

  const errors = validate(values)

  if (cart.isEmpty) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
        <span className="text-6xl" aria-hidden="true">
          🧾
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold text-stone-900 dark:text-stone-100">
          {labels.emptyCartTitle}
        </h1>
        <p className="mt-2 text-stone-500 dark:text-stone-400">{labels.emptyCartSubtitle}</p>
        <Link
          to="/menu"
          className="mt-8 inline-block rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          {content.cartPage.browseMenuLabel}
        </Link>
      </div>
    )
  }

  function handleChange(name, value) {
    setValues((previous) => ({ ...previous, [name]: value }))
    setTouched((previous) => ({ ...previous, [name]: true }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setTouched(Object.fromEntries(labels.fields.map((field) => [field.name, true])))
    if (Object.keys(errors).length > 0) return
    const order = placeOrder(values, paymentMethod)
    navigate(`/order/${order.id}`)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-stone-900 sm:text-4xl dark:text-stone-100">
          {labels.title}
        </h1>
        <p className="mt-2 text-stone-500 dark:text-stone-400">{labels.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-700 dark:bg-stone-800 dark:shadow-none">
            <h2 className="font-display text-xl font-bold text-stone-900 dark:text-stone-100">
              {labels.deliveryTitle}
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {labels.fields.map((field) => {
                const showError = touched[field.name] && errors[field.name]
                return (
                  <div key={field.name} className={field.span === 2 ? 'sm:col-span-2' : ''}>
                    <label
                      htmlFor={field.name}
                      className="mb-1.5 block text-sm font-medium text-stone-700 dark:text-stone-300"
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      autoComplete={field.autoComplete}
                      placeholder={field.placeholder}
                      value={values[field.name]}
                      onChange={(event) => handleChange(field.name, event.target.value)}
                      className={`w-full rounded-xl border bg-stone-50 px-4 py-2.5 text-sm text-stone-900 outline-none transition focus:bg-white focus:ring-2 dark:bg-stone-900 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:bg-stone-900 ${
                        showError
                          ? 'border-red-400 focus:border-red-400 focus:ring-red-100 dark:border-red-500 dark:focus:border-red-500 dark:focus:ring-red-900/40'
                          : 'border-stone-200 focus:border-brand-400 focus:ring-brand-100 dark:border-stone-700 dark:focus:border-brand-500 dark:focus:ring-stone-700'
                      }`}
                    />
                    {showError && (
                      <p className="mt-1 text-xs font-medium text-red-500 dark:text-red-400">
                        {field.errorMessage}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
            {touched.fullName && Object.keys(errors).length > 0 && (
              <p className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 dark:bg-red-900/30 dark:text-red-300">
                {labels.errorSummaryLabel}
              </p>
            )}
          </section>

          <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-700 dark:bg-stone-800 dark:shadow-none">
            <h2 className="font-display text-xl font-bold text-stone-900 dark:text-stone-100">
              {labels.paymentTitle}
            </h2>
            <div className="mt-4 space-y-3">
              {labels.paymentOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                    paymentMethod === option.value
                      ? 'border-brand-500 bg-brand-50 dark:border-brand-400 dark:bg-stone-700'
                      : 'border-stone-200 hover:border-brand-300 dark:border-stone-600 dark:hover:border-brand-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={option.value}
                    checked={paymentMethod === option.value}
                    onChange={() => setPaymentMethod(option.value)}
                    className="accent-brand-600"
                  />
                  <span className="text-sm font-medium text-stone-800 dark:text-stone-200">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-700 dark:bg-stone-800 dark:shadow-none">
          <h2 className="font-display text-xl font-bold text-stone-900 dark:text-stone-100">
            {labels.reviewTitle}
          </h2>
          <ul className="mt-4 space-y-3 border-b border-stone-100 pb-4 dark:border-stone-700">
            {cart.lines.map((line) => (
              <li key={line.id} className="flex items-center justify-between gap-3 text-sm">
                <span className="text-stone-600 dark:text-stone-400">
                  <span aria-hidden="true">{line.menuItem.emoji}</span> {line.menuItem.name}{' '}
                  <span className="text-stone-400 dark:text-stone-500">×{line.quantity}</span>
                </span>
                <span className="shrink-0 font-medium text-stone-900 dark:text-stone-100">
                  {line.formattedLineTotal}
                </span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between text-stone-600 dark:text-stone-400">
              <dt>{content.cartPage.subtotalLabel}</dt>
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

          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-200 transition hover:bg-brand-700 active:scale-95 dark:shadow-none"
          >
            {labels.placeOrderLabel}
          </button>
          <Link
            to="/cart"
            className="mt-3 block rounded-full border border-stone-200 px-6 py-3 text-center text-sm font-semibold text-stone-600 transition hover:border-brand-300 hover:text-brand-700 dark:border-stone-600 dark:text-stone-300 dark:hover:border-brand-400 dark:hover:text-brand-400"
          >
            {labels.backToCartLabel}
          </Link>
        </aside>
      </form>
    </div>
  )
}

function validate(values) {
  const errors = {}
  for (const field of content.checkoutPage.fields) {
    const value = (values[field.name] ?? '').trim()
    if (field.name === 'notes') continue
    if (field.name === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errors.email = field.errorMessage
      continue
    }
    if (field.name === 'phone') {
      if (!/^(\+63|0)9\d{9}$/.test(value.replace(/[\s-]/g, ''))) errors.phone = field.errorMessage
      continue
    }
    const minimum = field.name === 'address' ? 8 : 2
    if (value.length < minimum) errors[field.name] = field.errorMessage
  }
  return errors
}
