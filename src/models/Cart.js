import { CartLine } from './CartLine'
import { Money } from './Money'
import { MenuItem } from './MenuItem'

export class Cart {
  static TAX_RATE = 0.08
  static SERVICE_FEE_RATE = 0.05

  constructor(lines = []) {
    this.lines = lines
  }

  static empty() {
    return new Cart([])
  }

  static fromStored(stored) {
    const lines = (stored?.lines ?? []).map(
      (line) => new CartLine(MenuItem.fromObject(line.item ?? line.menuItem), line.quantity),
    )
    return new Cart(lines)
  }

  getLine(itemId) {
    return this.lines.find((line) => line.id === itemId)
  }

  has(itemId) {
    return Boolean(this.getLine(itemId))
  }

  add(menuItem, quantity = 1) {
    const existing = this.getLine(menuItem.id)
    if (existing) {
      existing.increase(quantity)
    } else {
      this.lines.push(new CartLine(menuItem, quantity))
    }
    return this
  }

  removeItem(itemId) {
    this.lines = this.lines.filter((line) => line.id !== itemId)
    return this
  }

  setQuantity(itemId, quantity) {
    const line = this.getLine(itemId)
    if (!line) return this
    if (quantity <= 0) {
      return this.removeItem(itemId)
    }
    line.withQuantity(quantity)
    return this
  }

  increment(itemId) {
    const line = this.getLine(itemId)
    if (line) line.increase()
    return this
  }

  decrement(itemId) {
    const line = this.getLine(itemId)
    if (!line) return this
    if (line.quantity <= 1) return this.removeItem(itemId)
    line.decrease()
    return this
  }

  get itemCount() {
    return this.lines.reduce((total, line) => total + line.quantity, 0)
  }

  get isEmpty() {
    return this.lines.length === 0
  }

  get subtotal() {
    return Money.add(...this.lines.map((line) => line.lineTotal))
  }

  get tax() {
    return Money.percentOf(this.subtotal, Cart.TAX_RATE)
  }

  get serviceFee() {
    return Money.percentOf(this.subtotal, Cart.SERVICE_FEE_RATE)
  }

  get total() {
    return Math.round((this.subtotal + this.tax + this.serviceFee) * 100) / 100
  }

  get formattedSubtotal() {
    return Money.format(this.subtotal)
  }

  get formattedTotal() {
    return Money.format(this.total)
  }

  clone() {
    return new Cart(this.lines.map((line) => new CartLine(line.menuItem, line.quantity)))
  }

  clear() {
    this.lines = []
    return this
  }

  toJSON() {
    return {
      lines: this.lines.map((line) => line.toJSON()),
      itemCount: this.itemCount,
      subtotal: this.subtotal,
      tax: this.tax,
      serviceFee: this.serviceFee,
      total: this.total,
    }
  }
}
