import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import Toast from './components/Toast'
import { CartProvider } from './context/CartContext'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import DishDetailPage from './pages/DishDetailPage'
import FullMenuPage from './pages/FullMenuPage'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import NotFoundPage from './pages/NotFoundPage'
import OrderConfirmationPage from './pages/OrderConfirmationPage'

export default function App() {
  return (
    <CartProvider>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-amber-50/40 dark:bg-stone-900">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/full-menu" element={<FullMenuPage />} />
            <Route path="/menu/:itemId" element={<DishDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order/:orderId" element={<OrderConfirmationPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
        <Toast />
      </div>
    </CartProvider>
  )
}
