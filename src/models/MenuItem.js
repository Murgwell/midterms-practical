import { Money } from './Money'

export class MenuItem {
  constructor({
    id,
    name,
    description,
    price,
    categoryId,
    emoji,
    tags = [],
    rating = 0,
    prepTimeMinutes = 15,
    isAvailable = true,
    isFeatured = false,
    calories = 0,
  }) {
    this.id = id
    this.name = name
    this.description = description
    this.price = price
    this.categoryId = categoryId
    this.emoji = emoji
    this.tags = tags
    this.rating = rating
    this.prepTimeMinutes = prepTimeMinutes
    this.isAvailable = isAvailable
    this.isFeatured = isFeatured
    this.calories = calories
  }

  static fromObject(raw) {
    return new MenuItem(raw)
  }

  get formattedPrice() {
    return Money.format(this.price)
  }

  get displayRating() {
    return this.rating.toFixed(1)
  }

  matchesSearch(query) {
    const term = query.trim().toLowerCase()
    if (!term) return true
    const haystack = [this.name, this.description, ...this.tags]
      .join(' ')
      .toLowerCase()
    return haystack.includes(term)
  }

  isInCategory(categoryId) {
    return categoryId === 'all' || this.categoryId === categoryId
  }

  matchesAnyTag(tags) {
    if (tags.length === 0) return true
    return tags.some((tag) => this.tags.includes(tag))
  }

  isPricedAtMost(maxPrice) {
    return this.price <= maxPrice
  }

  static sortBy(items, sortKey) {
    const sorted = [...items]
    switch (sortKey) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price)
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price)
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating)
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name))
      default:
        return sorted.sort((a, b) => b.isFeatured - a.isFeatured || b.rating - a.rating)
    }
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      categoryId: this.categoryId,
      emoji: this.emoji,
      tags: this.tags,
      rating: this.rating,
      prepTimeMinutes: this.prepTimeMinutes,
      isAvailable: this.isAvailable,
      isFeatured: this.isFeatured,
      calories: this.calories,
    }
  }
}
