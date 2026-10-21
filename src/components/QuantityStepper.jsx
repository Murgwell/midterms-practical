export default function QuantityStepper({ value, onIncrement, onDecrement, min = 1 }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-stone-200 bg-white p-1 dark:border-stone-700 dark:bg-stone-800">
      <button
        type="button"
        onClick={onDecrement}
        disabled={value <= min}
        aria-label="-"
        className="flex h-8 w-8 items-center justify-center rounded-full text-lg font-bold text-brand-700 transition hover:bg-brand-50 disabled:cursor-not-allowed disabled:text-stone-300 dark:text-brand-400 dark:hover:bg-stone-700 dark:disabled:text-stone-600"
      >
        −
      </button>
      <span className="min-w-8 text-center text-sm font-semibold text-stone-900 dark:text-stone-100">
        {value}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        aria-label="+"
        className="flex h-8 w-8 items-center justify-center rounded-full text-lg font-bold text-brand-700 transition hover:bg-brand-50 dark:text-brand-400 dark:hover:bg-stone-700"
      >
        +
      </button>
    </div>
  )
}
