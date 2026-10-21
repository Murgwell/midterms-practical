import { NavLink, Link } from 'react-router-dom'
import { content } from '../data/content'
import { useCart } from '../hooks/useCart'
import { useTheme } from '../hooks/useTheme'

export default function Navbar() {
  const { cart } = useCart()
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const toggle = content.themeToggle

  return (
    <header className="sticky top-0 z-40 border-b border-brand-100 bg-white/90 backdrop-blur dark:border-stone-800 dark:bg-stone-900/90">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden="true">
            {content.brand.emoji}
          </span>
          <span className="font-display text-xl font-bold text-brand-800 dark:text-brand-400">
            {content.brand.name}
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <nav className="flex items-center gap-1 sm:gap-2">
            {content.nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `relative flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition sm:px-4 ${
                    isActive
                      ? 'bg-brand-600 text-white'
                      : 'text-stone-600 hover:bg-brand-50 hover:text-brand-700 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-brand-400'
                  }`
                }
              >
                <span aria-hidden="true">{item.icon}</span>
                <span className="hidden sm:inline">{item.label}</span>
                {item.to === '/cart' && cart.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-stone-900 px-1 text-xs font-bold text-white dark:bg-brand-500">
                    {cart.itemCount}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? toggle.toLight : toggle.toDark}
            title={isDark ? toggle.toLight : toggle.toDark}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-lg transition hover:border-brand-300 hover:bg-brand-50 dark:border-stone-700 dark:hover:border-brand-500 dark:hover:bg-stone-800"
          >
            <span aria-hidden="true">{isDark ? toggle.lightIcon : toggle.darkIcon}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
