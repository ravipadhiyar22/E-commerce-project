import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home.jsx';
import Products from "./components/pages/Products.jsx";
import ProductDetail from "./components/pages/ProductDetail.jsx";
import About from "./components/pages/About.jsx";
import Contact from "./components/pages/Contact.jsx";
import Login from "./components/pages/auth/Login.jsx";
import Signup from "./components/pages/auth/Signup.jsx";
import Cart from "./components/pages/Cart.jsx";
import Navbar from "./components/header/Navbar.jsx";
import Footer from "./components/footer/Footer.jsx";
import Profile from "./components/pages/profile/Profile.jsx";
import AdminPanel from "./components/pages/AdminPanel.jsx";
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ScrollToTop from './components/pages/ScrollToTop.jsx';
import AdminDashbord from './components/admin/AdminDashbord.jsx';
import Adminproduct from "./components/admin/Products.jsx"
import Addproduct from './components/admin/Addproduct.jsx';
import Updateproduct from "./components/admin/Updateproduct.jsx"
import OrderManagement from './components/admin/OrderManagement.jsx';
import Wishlist from "./components/pages/Wishlist.jsx";
import Searchpage from './components/pages/Searchpage.jsx';
import Loader from './components/Loader.jsx';
import Address from './components/pages/checkout/Address.jsx';
import { Cartcontext } from './context/Cartcontext.jsx';
import OrderConfirm from "./components/pages/checkout/OrderConfirm.jsx"
import Orders from "./components/pages/profile/Orders.jsx"

function App() {

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-amber-50">

        <Navbar />
        <main>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path='/products/search' element={<Searchpage />} exact />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />


            <Route path="/cart" element={
              <Cartcontext>
                <Cart />
              </Cartcontext>
            } />

            <Route path='/loader' element={<Loader />} />
            <Route path="/wishlist" element={<Wishlist />} />

            <Route path='/confirmorder' element={
              <ProtectedRoute>
                <OrderConfirm />
              </ProtectedRoute>
            } />

            <Route path='/address' element={
              <Cartcontext>
                <Address />
              </Cartcontext>

            } />

            {/* protected routes */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } >
              <Route path='orders' element={<Orders />} />
            </Route>

            {/* only admin can access this route */}

            <Route path="/admin" element={
              <ProtectedRoute requiredrole="admin">
                <AdminPanel />
              </ProtectedRoute>
            } >
              <Route index element={<AdminDashbord />} />
              <Route path='products' element={<Adminproduct />} />
              <Route path='addproduct' element={<Addproduct />} />
              <Route path='products/update/:id' element={<Updateproduct />} />
              <Route path='orders' element={<OrderManagement />} />
            </Route>

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
