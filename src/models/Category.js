export class Category {
  constructor({ id, name, emoji, description, sortOrder = 0 }) {
    this.id = id
    this.name = name
    this.emoji = emoji
    this.description = description
    this.sortOrder = sortOrder
  }

  static fromObject(raw) {
    return new Category(raw)
  }

  static sortByOrder(categories) {
    return [...categories].sort((a, b) => a.sortOrder - b.sortOrder)
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      emoji: this.emoji,
      description: this.description,
      sortOrder: this.sortOrder,
    }
  }
}
