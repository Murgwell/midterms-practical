import { useCart } from '../hooks/useCart'

export default function Toast() {
  const { toast } = useCart()

  if (!toast) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
      <div className="rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white shadow-xl dark:bg-stone-100 dark:text-stone-900">
        {toast}
      </div>
    </div>
  )
}
