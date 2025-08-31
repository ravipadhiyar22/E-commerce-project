import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from "../../api/axios.js"
import { Star, Filter, Grid, List, ShoppingBag, Heart, CloudCog } from 'lucide-react';
import ProductCard from './ProductCard.jsx';

const Products = () => {
  const [searchparams] = useSearchParams();

  const initialcategory = searchparams.get("category") || "all";

  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState(initialcategory);
  const [priceRange, setPriceRange] = useState([0, 5000]);

  const [products, setproducts] = useState([]);
  useEffect(() => {

    ; (async () => {
      try {

        const resdata = await api.get("/products/productcard");
        setproducts(resdata.data.product);

      } catch (error) {
        console.log("erroe while fetch the productcard", error);
      }
    })();


  }, [])


  const categories = [
    { value: 'all', label: 'All Products', count: products.length },
    { value: 'women', label: 'For Her', count: products.filter(p => p.category === 'women').length },
    { value: 'male', label: 'For Him', count: products.filter(p => p.category === 'male').length },
    { value: 'unisex', label: 'Unisex', count: products.filter(p => p.category === 'unisex').length }
  ];

  const filteredProducts = products.filter(product => {
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }
    if (product.price < [0] || product.price > priceRange[1]) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* -----------------------Header----------------------- */}

        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            All Products
          </h1>
          <p className="text-gray-600 text-lg">
            Discover our complete collection of luxury fragrances
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* -----------------------Sidebar Filters----------------------- */}
          <div className="lg:w-64 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </h3>

              {/*----------------------- Categories----------------------- */}
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

              {/* -----------------------Price Range----------------------- */}
              <div className="mb-6">
                <h4 className="text-md font-medium text-gray-900 mb-3">Price Range</h4>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="5000"
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

          {/* -----------------------Main Content -----------------------*/}
          <div className="flex-1">
            {/*----------------------- Toolbar -----------------------*/}
            <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="text-gray-600">
                  Showing {filteredProducts.length} of {products.length} products
                </div>

                <div className="flex items-center gap-4">
                 
                  {/* -----------------------View Mode----------------------- */}
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

            {/*----------------------- Products Grid -----------------------*/}
            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
              {filteredProducts.map((product) =>
                <ProductCard key={product._id} product={product} viewMode={viewMode} />
              )}
            </div>

            {/* -----------------------Load More -----------------------*/}
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