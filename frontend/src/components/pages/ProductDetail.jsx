import React, { useEffect, useState } from 'react';
import api from '../../api/axios.js';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingBag, Heart, Share2, Truck, Shield, RotateCcw, Plus, Minus, CloudCog } from 'lucide-react';
import { setLocalQuantity, addLocalItem, toCartItemFromProduct } from "../../utils/LocalCart.js"

const ProductDetail = () => {
  const { slug } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [product, setproduct] = useState([]);

  useEffect(() => {

    ; (async () => {
      try {
        const safeslug = encodeURIComponent(slug);
        const resdata = await api.get(`/products/${safeslug}`)
        console.log(resdata)
        setproduct(resdata.data.productdata);

      } catch (error) {
        console.log("error while get single product", error)
      }
    })();

  }, [slug]);

  function handleclick() {
    addLocalItem(product, quantity);
  }


  const relatedProducts = [
    {
      id: 2,
      name: "Golden Sunrise",
      price: 95.99,
      image: "https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.9
    },
    {
      id: 3,
      name: "Ocean Breeze",
      price: 75.99,
      image: "https://images.pexels.com/photos/1766678/pexels-photo-1766678.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.7
    },
    {
      id: 4,
      name: "Rose Garden",
      price: 110.99,
      image: "https://images.pexels.com/photos/1179760/pexels-photo-1179760.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.9
    }
  ];

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">

          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><Link to="/" className="hover:text-purple-600">Home</Link></li>
            <li>/</li>
            <li><Link to="/products" className="hover:text-purple-600">Products</Link></li>
            <li>/</li>
            <li className="text-gray-900">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-2xl bg-white shadow-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <p className="text-sm text-gray-500 mb-2">{product.name}</p>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                        }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 ml-2">({product.reviews} reviews)</span>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-purple-600">${product.selling_price}</span>
                {product.price && (
                  <span className="text-xl text-gray-500 line-through">${product.price}</span>
                )}
                {product.price && product.selling_price && product.price > product.selling_price && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Save ${(product.price - product.selling_price).toFixed(2)}
                  </span>)}
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Quantity</label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={decrementQuantity}
                      className="p-2 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={incrementQuantity}
                      className="p-2 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  disabled={!product.stock}
                  onClick={handleclick}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-amber-500 text-white py-4 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>

                <button className="px-6 py-4 border-2 border-gray-300 rounded-xl font-semibold hover:border-purple-500 hover:text-purple-600 transition-all duration-200 flex items-center justify-center space-x-2">
                  <Heart className="h-5 w-5" />
                  <span className="hidden sm:inline">Wishlist</span>
                </button>

                <button className="px-6 py-4 border-2 border-gray-300 rounded-xl font-semibold hover:border-purple-500 hover:text-purple-600 transition-all duration-200 flex items-center justify-center">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <Truck className="h-6 w-6 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-900">Free Shipping</p>
                  <p className="text-sm text-gray-600">On orders over $50</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-900">Authentic</p>
                  <p className="text-sm text-gray-600">100% genuine</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <RotateCcw className="h-6 w-6 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-900">Easy Returns</p>
                  <p className="text-sm text-gray-600">30-day policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-16">
          <div className="border-b border-gray-200 mb-8">
            <nav className="flex space-x-8">
              {['description', 'notes', 'details', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors duration-200 ${activeTab === tab
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm">
            {activeTab === 'description' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Product Description</h3>
                <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
                <p className="text-gray-700 leading-relaxed">
                  Perfect for the modern world appreciates timeless elegance with a contemporary twist.
                  This fragrance is crafted with the finest ingredients sourced from around the world,
                  ensuring a luxurious experience with every spray.
                </p>
              </div>
            )}

            {activeTab === 'notes' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Fragrance Notes</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-purple-600 mb-3">Top Notes</h4>
                    <ul className="space-y-2">
                      {product.notes.top.map((note, index) => (
                        <li key={index} className="text-gray-700">{note}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-600 mb-3">Middle Notes</h4>
                    <ul className="space-y-2">
                      {product.notes.middle.map((note, index) => (
                        <li key={index} className="text-gray-700">{note}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-600 mb-3">Base Notes</h4>
                    <ul className="space-y-2">
                      {product.notes.base.map((note, index) => (
                        <li key={index} className="text-gray-700">{note}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'details' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Product Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(product.details).map(([key, value]) => (
                    <div key={key} className="flex">
                      <span className="font-medium text-gray-900 capitalize w-32">{key.replace(/([A-Z])/g, ' $1')}:</span>
                      <span className="text-gray-700">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Customer Reviews</h3>
                <div className="space-y-6">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="border-b border-gray-200 pb-6">
                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span className="ml-3 font-medium text-gray-900">Sarah Johnson</span>
                        <span className="ml-3 text-sm text-gray-500">2 weeks ago</span>
                      </div>
                      <p className="text-gray-700">
                        Absolutely love this fragrance! It's sophisticated yet playful, perfect for both
                        day and evening wear. The longevity is impressive and I always get compliments when wearing it.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>


        {/* -----------------------------  relatedProduct ------------------------- */}

        {/* Related Products */}
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                to={`/product/${relatedProduct.id}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{relatedProduct.name}</h3>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(relatedProduct.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                            }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">({relatedProduct.rating})</span>
                  </div>
                  <p className="text-xl font-bold text-purple-600">${relatedProduct.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;