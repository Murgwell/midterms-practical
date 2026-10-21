import { useCallback, useEffect, useMemo, useState } from 'react'
import { content } from '../data/content'
import { interpolate } from '../lib/interpolate'
import { Cart } from '../models/Cart'
import { Customer } from '../models/Customer'
import { Order } from '../models/Order'
import { CartContext } from './cart-context'

const STORAGE_KEY = 'sarap-kitchen-cart'

function loadStoredCart() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored ? Cart.fromStored(JSON.parse(stored)) : Cart.empty()
  } catch {
    return Cart.empty()
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(loadStoredCart)
  const [orders, setOrders] = useState([])
  const [toast, setToast] = useState(null)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart.toJSON()))
  }, [cart])

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(null), 2600)
    return () => window.clearTimeout(timer)
  }, [toast])

  const addItem = useCallback((menuItem, quantity = 1) => {
    setCart((previous) => {
      const next = previous.clone()
      next.add(menuItem, quantity)
      return next
    })
    setToast(interpolate(content.toast.addedTemplate, { name: menuItem.name }))
  }, [])

  const removeItem = useCallback((itemId) => {
    setCart((previous) => previous.clone().removeItem(itemId))
  }, [])

  const incrementItem = useCallback((itemId) => {
    setCart((previous) => previous.clone().increment(itemId))
  }, [])

  const decrementItem = useCallback((itemId) => {
    setCart((previous) => previous.clone().decrement(itemId))
  }, [])

  const clearCart = useCallback(() => setCart(Cart.empty()), [])

  const placeOrder = useCallback(
    ({ fullName, email, phone, address, notes }, paymentMethod) => {
      const customer = new Customer({ fullName, email, phone, address, notes })
      const order = Order.create({ customer, cart, paymentMethod })
      setOrders((previous) => [order, ...previous])
      setCart(Cart.empty())
      return order
    },
    [cart],
  )

  const getOrder = useCallback((orderId) => orders.find((order) => order.id === orderId), [orders])

  const value = useMemo(
    () => ({
      cart,
      orders,
      toast,
      addItem,
      removeItem,
      incrementItem,
      decrementItem,
      clearCart,
      placeOrder,
      getOrder,
    }),
    [cart, orders, toast, addItem, removeItem, incrementItem, decrementItem, clearCart, placeOrder, getOrder],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
