import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X, Heart, CloudCog } from 'lucide-react';
import useAuth from '../../context/Authcontext.jsx';
import { loadservercart } from "../../utils/ServerCart.js"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setcartCount] = useState(0);
  const navigate = useNavigate();

  const { user, loading } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  console.log("user:", user)
  // getting cart count
  useEffect(() => {
    const computeFromLocal = async () => {
      const items = await loadservercart(user);
      console.log("load cart", items.items)
      setcartCount(items.items.length);
    };

    // initial load
    computeFromLocal();

    // live updates from any add/remove/quantity change
    const onCartUpdated = (e) => {
      if (e?.detail?.totalProducts != null) {
        setcartCount(e.detail.totalProducts); // distinct products from event
      } else {
        computeFromLocal();
      }
    };

    window.addEventListener('cart:updated', onCartUpdated);
    return () => window.removeEventListener('cart:updated', onCartUpdated);
  }, [user, cartCount]);


  const [searchtext, setsearchtext] = useState("");
  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchtext.trim()) {
      navigate(`/products/search?query=${searchtext}`);
    }

  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-amber-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-amber-500 bg-clip-text text-transparent">
              LuxeScent
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200">
              Products
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200">
              Contact
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchtext}
                onChange={(e) => setsearchtext(e.target.value)}
                placeholder="Search fragrances..."
                className="w-full px-4 py-2 pl-10 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </form>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search */}
            {/* <button className="lg:hidden p-2 text-gray-600 hover:text-purple-600 transition-colors duration-200">
              <Search className="h-6 w-6" />
            </button> */}

            {/* Wishlist */}
            <Link to="/wishlist" className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200">
              Wishlist
            </Link>
            {/* User Account */}
            {/* <Link to="/login" className="hidden sm:block p-2 text-gray-600 hover:text-purple-600 transition-colors duration-200">
              <User className="h-6 w-6" />
            </Link> */}

            {
              loading ?
                (
                  // 3a. While auth state is loading, show a pulsing placeholder
                  <div className="hidden sm:block p-2 animate-pulse">
                    <User className="h-6 w-6 text-gray-300" />
                  </div>
                )
                : user ?
                  (
                    <Link to='/profile' className="hidden sm:block icon-btn">
                      <User className="h-6 w-6" />
                    </Link>
                  ) :
                  (
                    // 3c. If not logged in, link to Login page
                    <Link to="/login" className="hidden sm:block icon-btn">
                      <User className="h-6 w-6" />
                    </Link>
                  )
            }

            {/* Admin Panel Link (admins only) */}
            {user?.role === 'admin' && (
              <Link to="/admin" className="hidden lg:block nav-link">
                Admin Panel
              </Link>
            )}

            {/* Shopping Cart */}
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-purple-600 transition-colors duration-200">
              <ShoppingBag className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 text-gray-600 hover:text-purple-600 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search fragrances..."
                className="w-full px-4 py-2 pl-10 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </form>

            {/* Mobile Navigation Links */}
            <div className="space-y-3">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>

              {/* admin page in mobile */}
              {user?.role === 'admin' && (
                <Link to="/admin" className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
                >
                  Admin Panel
                </Link>
              )}

              {/* userprofile in mobile */}
              {
                user ?
                  (
                    <Link to='/profile'
                      className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
                      onClick={() => { setIsMenuOpen(false) }}
                    >
                      <User className="h-6 w-6" />
                    </Link>
                  ) :
                  (

                    <Link
                      to="/login"
                      className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-6 w-6" />
                    </Link>
                  )
              }
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;