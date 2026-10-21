import { Money } from './Money'

export class CartLine {
  constructor(menuItem, quantity = 1) {
    this.menuItem = menuItem
    this.quantity = quantity
  }

  get id() {
    return this.menuItem.id
  }

  get lineTotal() {
    return Money.percentOf(this.menuItem.price * this.quantity, 1)
  }

  get formattedLineTotal() {
    return Money.format(this.lineTotal)
  }

  increase(amount = 1) {
    this.quantity += amount
    return this.quantity
  }

  decrease(amount = 1) {
    this.quantity = Math.max(0, this.quantity - amount)
    return this.quantity
  }

  withQuantity(quantity) {
    this.quantity = Math.max(0, quantity)
    return this
  }

  toJSON() {
    return {
      item: this.menuItem.toJSON(),
      quantity: this.quantity,
      lineTotal: this.lineTotal,
    }
  }
}
