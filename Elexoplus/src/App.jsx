import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import SingleProductPage from './pages/SingleProductPage'
import ContactPage from './pages/ContactUs'
import AboutPage from './pages/AboutUs'
import Store from './pages/Store'
import CartPage from './pages/CartPage'

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<SingleProductPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/store" element={<Store/>} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>

      <Footer />
    </Router>
  )
}

export default App;