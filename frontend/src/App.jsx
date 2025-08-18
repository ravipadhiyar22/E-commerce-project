import { useState } from 'react';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home.jsx';
import Products from "./components/pages/Products.jsx";
import ProductDetail from "./components/pages/ProductDetail.jsx";
import About from "./components/pages/About.jsx";
import Contact from "./components/pages/Contact.jsx";
import Login from "./components/pages/Login.jsx";
import Signup from "./components/pages/Signup.jsx";
import Cart from "./components/pages/Cart.jsx";
import Navbar from "./components/header/Navbar.jsx";
import Footer from "./components/footer/Footer.jsx";
import Profile from "./components/pages/Profile.jsx";
import AdminPanel from "./components/pages/AdminPanel.jsx";
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ScrollToTop from './components/pages/ScrollToTop.jsx';




function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-amber-50">

        <Navbar />
        <main>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />

            {/* protected routes */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />

            {/* only admin can access this route */}

            <Route path="/admin" element={
              <ProtectedRoute requiredrole="admin">
                <AdminPanel />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
