import React, { use, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Gift, Truck, Shield } from 'lucide-react';
import { readLocalCart, removeLocalItem, setLocalQuantity } from "../../utils/LocalCart.js"
import { loadservercart, updatecartservice, removeitemsfromcart } from "../../utils/ServerCart.js"
import useAuth from '../../context/Authcontext.jsx';
import Loader from '../Loader.jsx';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();

  const [loadingstate, setloading] = useState(false);
  useEffect(() => {
    ; (async function getcart() {
      try {
        setloading(true);
        const items = await loadservercart(user);
        setloading(false);
        setCartItems(items.items)
      } catch (error) {
        setCartItems(readLocalCart());
      }
    })();

  }, [user]);

  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);


  const updateQuantity = async (id, newQuantity) => {
    const items = await updatecartservice(id, newQuantity, user);
    console.log("step:1-call-items updatecall:", items)
    setCartItems(items.items);
  };

  const removeItem = async (id) => {
    const data = await removeitemsfromcart(id, user);
    setCartItems(data.items);
  };


  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'luxe10') {
      setIsPromoApplied(true);
      alert('Promo code applied successfully!');
    } else {
      alert('Invalid promo code. Try "LUXE10" for 10% off!');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.selling_price * item.quantity), 0);
  const savings = cartItems.reduce((sum, item) => {
    const itemSavings = item.price ? (item.price - item.selling_price) * item.quantity : 0;
    return sum + itemSavings;
  }, 0);
  const discount = isPromoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = (subtotal - discount) * 0.03;
  const total = subtotal - discount + shipping + tax;

  const benefits = [
    {
      icon: <Truck className="h-5 w-5" />,
      title: "Free Shipping",
      description: subtotal > 50 ? "Qualified!" : `Add $${(50 - subtotal).toFixed(2)} more`
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Secure Checkout",
      description: "SSL encrypted"
    },
    {
      icon: <Gift className="h-5 w-5" />,
      title: "Gift Wrapping",
      description: "Available at checkout"
    }
  ];

  //if cart is empty than disply shop now

  if (loadingstate) {
    return (
      <Loader />
    )
  }
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any fragrances to your cart yet.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-amber-500 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-amber-600 transition-all duration-200"
          >
            <span>Shop Now</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Product Image */}
                  <div className="w-full sm:w-32 h-48 sm:h-32 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">{item.brand}</p>
                        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                        {/* <p className="text-sm text-gray-600">Size: {item.size}</p> */}
                        {(item.stock !== undefined && item.stock <= 0) && (
                          <p className="text-sm text-red-600 font-medium mt-1">Out of Stock</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      {/* Price */}
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-purple-600">${item.selling_price}</span>
                        {item.price && (
                          <span className="text-sm text-gray-500 line-through">${item.price}</span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-600">Qty:</span>
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.stock === 0}
                            className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-2 font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item === 0}
                            className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <span className="text-lg font-semibold text-gray-900">
                          ${(item.selling_price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Benefits */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${benefit.title === "Free Shipping" && subtotal > 50
                      ? 'bg-green-100 text-green-600'
                      : 'bg-purple-100 text-purple-600'
                      }`}>
                      {benefit.icon}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{benefit.title}</p>
                      <p className="text-sm text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Promo Code */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Promo Code</h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter promo code"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  onClick={applyPromoCode}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors duration-200"
                >
                  Apply
                </button>
              </div>
              {isPromoApplied && (
                <p className="text-sm text-green-600 mt-2">✓ LUXE10 applied - 10% off!</p>
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h3>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>

                {savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Savings</span>
                    <span>-${savings.toFixed(2)}</span>
                  </div>
                )}

                {isPromoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (LUXE10)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>

                <hr className="border-gray-200" />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-purple-600">${total.toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-amber-500 text-white py-4 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-amber-600 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg">
                <span>Proceed to Checkout</span>
                <ArrowRight className="h-5 w-5" />
              </button>

              <div className="mt-4 text-center">
                <Link
                  to="/products"
                  className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-gray-100 p-4 rounded-xl">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield className="h-4 w-4" />
                <span>Secure 256-bit SSL encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;