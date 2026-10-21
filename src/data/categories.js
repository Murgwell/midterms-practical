import { Category } from '../models/Category'

const rawCategories = [
  {
    id: 'rice-meals',
    name: 'Rice Meals',
    emoji: '🍚',
    description: 'Classic ulam dishes served with garlic rice',
    sortOrder: 1,
  },
  {
    id: 'noodles',
    name: 'Noodles',
    emoji: '🍜',
    description: 'Pancit and soups for every occasion',
    sortOrder: 2,
  },
  {
    id: 'inhaw',
    name: 'Inihaw Grill',
    emoji: '🍢',
    description: 'Charcoal-grilled favorites, smoky and juicy',
    sortOrder: 3,
  },
  {
    id: 'merienda',
    name: 'Merienda',
    emoji: '🥟',
    description: 'Snacks and street-food bites',
    sortOrder: 4,
  },
  {
    id: 'drinks',
    name: 'Drinks',
    emoji: '🥤',
    description: 'Cool refreshers to pair with your meal',
    sortOrder: 5,
  },
  {
    id: 'desserts',
    name: 'Desserts',
    emoji: '🍰',
    description: 'Sweet endings to your meal',
    sortOrder: 6,
  },
]

export const categories = Category.sortByOrder(rawCategories.map(Category.fromObject))
