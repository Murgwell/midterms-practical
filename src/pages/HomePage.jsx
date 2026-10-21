import { Link } from 'react-router-dom'
import { categories } from '../data/categories'
import { content } from '../data/content'
import { menuItems } from '../data/menuItems'
import { useCart } from '../hooks/useCart'
import MenuItemCard from '../components/MenuItemCard'
import SectionHeading from '../components/SectionHeading'
import { MenuItem } from '../models/MenuItem'

export default function HomePage() {
  const { hero, home } = content
  const { addItem } = useCart()
  const featuredItems = MenuItem.sortBy(
    menuItems.filter((item) => item.isFeatured),
    'featured',
  ).slice(0, 4)

  return (
    <div>
      <section className="bg-gradient-to-br from-brand-600 via-brand-500 to-amber-400 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium backdrop-blur">
            {hero.eyebrow}
          </p>
          <h1 className="mt-6 max-w-2xl font-display text-4xl font-bold leading-tight sm:text-5xl">
            {hero.title}
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/90">{hero.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={hero.primaryCta.to}
              className="rounded-full bg-white px-6 py-3 font-semibold text-brand-700 shadow-lg transition hover:bg-brand-50 active:scale-95"
            >
              {hero.primaryCta.label}
            </Link>
            <a
              href={hero.secondaryCta.to}
              className="rounded-full border border-white/60 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              {hero.secondaryCta.label}
            </a>
          </div>
          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6">
            {hero.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-2xl font-bold sm:text-3xl">{stat.value}</dt>
                <dd className="mt-1 text-sm text-white/80">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <SectionHeading
          title={home.categories.title}
          subtitle={home.categories.subtitle}
          action={
            <Link
              to="/menu"
              className="text-sm font-semibold text-brand-600 transition hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
            >
              {home.categories.viewAllLabel} →
            </Link>
          }
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/menu?category=${category.id}`}
              className="flex flex-col items-center gap-2 rounded-2xl border border-stone-200 bg-white p-5 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md dark:border-stone-700 dark:bg-stone-800 dark:hover:border-brand-500"
            >
              <span className="text-4xl" aria-hidden="true">
                {category.emoji}
              </span>
              <span className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section id="featured" className="bg-white py-14 dark:bg-stone-800/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            title={home.featured.title}
            subtitle={home.featured.subtitle}
            action={
              <Link
                to="/menu"
                className="text-sm font-semibold text-brand-600 transition hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
              >
                {home.featured.viewAllLabel} →
              </Link>
            }
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredItems.map((item) => (
              <MenuItemCard key={item.id} item={item} onAdd={addItem} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <SectionHeading title={home.howItWorks.title} subtitle={home.howItWorks.subtitle} />
        <div className="grid gap-5 md:grid-cols-3">
          {home.howItWorks.steps.map((step, index) => (
            <div
              key={step.title}
              className="relative rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-700 dark:bg-stone-800 dark:shadow-none"
            >
              <span className="absolute top-5 right-5 font-display text-4xl font-bold text-brand-100 dark:text-stone-700">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-3xl" aria-hidden="true">
                {step.icon}
              </span>
              <h3 className="mt-3 font-semibold text-stone-900 dark:text-stone-100">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
