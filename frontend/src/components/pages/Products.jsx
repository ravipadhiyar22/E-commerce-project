import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Filter, Grid, List, ShoppingBag, Heart } from 'lucide-react';

const Products = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 200]);

  const products = [
    {
      id: 1,
      name: "Midnight Elegance",
      brand: "LuxeScent",
      price: 89.99,
      originalPrice: 120.00,
      image: "https://images.pexels.com/photos/1191710/pexels-photo-1191710.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      reviews: 234,
      category: "women",
      isNew: false,
      isSale: true
    },
    {
      id: 2,
      name: "Golden Sunrise",
      brand: "Aurora",
      price: 95.99,
      originalPrice: 130.00,
      image: "https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      reviews: 189,
      category: "unisex",
      isNew: true,
      isSale: true
    },
    {
      id: 3,
      name: "Ocean Breeze",
      brand: "AquaLux",
      price: 75.99,
      originalPrice: 100.00,
      image: "https://images.pexels.com/photos/1766678/pexels-photo-1766678.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.7,
      reviews: 156,
      category: "men",
      isNew: false,
      isSale: true
    },
    {
      id: 4,
      name: "Rose Garden",
      brand: "Botanical",
      price: 110.99,
      originalPrice: 145.00,
      image: "https://images.pexels.com/photos/1179760/pexels-photo-1179760.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      reviews: 298,
      category: "women",
      isNew: false,
      isSale: true
    },
    {
      id: 5,
      name: "Urban Nights",
      brand: "Metropolitan",
      price: 85.99,
      originalPrice: null,
      image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.6,
      reviews: 127,
      category: "men",
      isNew: true,
      isSale: false
    },
    {
      id: 6,
      name: "Vanilla Dreams",
      brand: "Sweet Essence",
      price: 92.99,
      originalPrice: null,
      image: "https://images.pexels.com/photos/1070049/pexels-photo-1070049.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      reviews: 203,
      category: "women",
      isNew: false,
      isSale: false
    },
    {
      id: 7,
      name: "Forest Walk",
      brand: "Nature's Touch",
      price: 78.99,
      originalPrice: 95.00,
      image: "https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.7,
      reviews: 145,
      category: "unisex",
      isNew: false,
      isSale: true
    },
    {
      id: 8,
      name: "Citrus Burst",
      brand: "Fresh & Clean",
      price: 68.99,
      originalPrice: null,
      image: "https://images.pexels.com/photos/1191536/pexels-photo-1191536.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.5,
      reviews: 89,
      category: "unisex",
      isNew: true,
      isSale: false
    }
  ];

  const categories = [
    { value: 'all', label: 'All Products', count: products.length },
    { value: 'women', label: 'For Her', count: products.filter(p => p.category === 'women').length },
    { value: 'men', label: 'For Him', count: products.filter(p => p.category === 'men').length },
    { value: 'unisex', label: 'Unisex', count: products.filter(p => p.category === 'unisex').length }
  ];

  const filteredProducts = products.filter(product => {
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            All Products
          </h1>
          <p className="text-gray-600 text-lg">
            Discover our complete collection of luxury fragrances
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </h3>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="text-md font-medium text-gray-900 mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category.value} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category.value}
                        checked={selectedCategory === category.value}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                      />
                      <span className="ml-3 text-gray-700">
                        {category.label} ({category.count})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-md font-medium text-gray-900 mb-3">Price Range</h4>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="text-gray-600">
                  Showing {filteredProducts.length} of {products.length} products
                </div>

                <div className="flex items-center gap-4">
                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                    <option value="newest">Newest</option>
                  </select>

                  {/* View Mode */}
                  <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'bg-white text-gray-600'}`}
                    >
                      <Grid className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'bg-white text-gray-600'}`}
                    >
                      <List className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48' : ''}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`${viewMode === 'list' ? 'w-full h-48' : 'w-full h-64'} object-cover group-hover:scale-110 transition-transform duration-300`}
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 space-y-2">
                      {product.isNew && (
                        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          New
                        </span>
                      )}
                      {product.isSale && (
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          Sale
                        </span>
                      )}
                    </div>

                    {/* Wishlist */}
                    <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 hover:text-red-500 transition-colors duration-200">
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>

                  <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-purple-600">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className={`flex gap-2 ${viewMode === 'list' ? 'justify-end' : ''}`}>
                      <Link
                        to={`/product/${product.id}`}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-amber-500 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-amber-600 transition-all duration-200 flex items-center justify-center space-x-2 text-sm"
                      >
                        <ShoppingBag className="h-4 w-4" />
                        <span>Add to Cart</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            {filteredProducts.length === products.length && (
              <div className="text-center mt-12">
                <button className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200">
                  Load More Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;