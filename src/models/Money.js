const formatter = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  minimumFractionDigits: 2,
})

export class Money {
  static format(amount) {
    return formatter.format(amount)
  }

  static add(...amounts) {
    return amounts.reduce((sum, value) => sum + value, 0)
  }

  static percentOf(amount, rate) {
    return Math.round(amount * rate * 100) / 100
  }
}
