import { Money } from './Money'

let orderCounter = 1041

export class Order {
  static STATUS = {
    CONFIRMED: 'confirmed',
    PREPARING: 'preparing',
    OUT_FOR_DELIVERY: 'out-for-delivery',
    DELIVERED: 'delivered',
  }

  constructor({
    id,
    customer,
    lines,
    placedAt = new Date(),
    status = Order.STATUS.CONFIRMED,
    paymentMethod = 'cod',
  }) {
    this.id = id
    this.customer = customer
    this.lines = lines
    this.placedAt = placedAt
    this.status = status
    this.paymentMethod = paymentMethod
  }

  static generateId() {
    orderCounter += 1
    return `ORD-${orderCounter}`
  }

  static create({ customer, cart, paymentMethod = 'cod' }) {
    return new Order({
      id: Order.generateId(),
      customer,
      paymentMethod,
      lines: cart.lines.map((line) => ({
        name: line.menuItem.name,
        emoji: line.menuItem.emoji,
        quantity: line.quantity,
        unitPrice: line.menuItem.price,
        lineTotal: line.lineTotal,
      })),
    })
  }

  get itemCount() {
    return this.lines.reduce((total, line) => total + line.quantity, 0)
  }

  get subtotal() {
    return Money.add(...this.lines.map((line) => line.lineTotal))
  }

  get tax() {
    return Money.percentOf(this.subtotal, 0.08)
  }

  get serviceFee() {
    return Money.percentOf(this.subtotal, 0.05)
  }

  get total() {
    return Math.round((this.subtotal + this.tax + this.serviceFee) * 100) / 100
  }

  get formattedTotal() {
    return Money.format(this.total)
  }

  get formattedPlacedAt() {
    return new Intl.DateTimeFormat('en-PH', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(this.placedAt)
  }

  toJSON() {
    return {
      id: this.id,
      customer: this.customer.toJSON(),
      lines: this.lines,
      placedAt: this.placedAt,
      status: this.status,
      paymentMethod: this.paymentMethod,
      total: this.total,
    }
  }
}
