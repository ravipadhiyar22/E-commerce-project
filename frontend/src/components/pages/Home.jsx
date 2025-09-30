import React, { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Shield, HeartHandshake, Sparkles } from 'lucide-react';
import api from '../../api/axios';
import FeatureProductcart from "./FeatureProductcart"
// import Loader from "../Loader.jsx"

const Home = () => {

  const [product, setproduct] = useState([]);
  const [loading, setloding] = useState(false);
  useEffect(() => {
    ; (async () => {
      try {
        setloding(true);
        const resproduct = await api.get("/products/featureproduct");
        setproduct(resproduct.data.products)
        setloding(false);
      } catch (error) {
        console.log("error while fetch allproducts", error);
      }

    })();
  }, [])


  function Loader() {
    return (

      <div className="flex justify-center items-center  space-x-2 h-[60vh]">
        <div className="w-3 h-3 bg-black rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-black rounded-full animate-bounce delay-200"></div>
        <div className="w-3 h-3 bg-black rounded-full animate-bounce delay-400"></div>
      </div>

    )
  }
  const categories = [
    {
      name: "For Her",
      image: "https://res.cloudinary.com/ravipadhiyar/image/upload/v1756319013/WhatsApp_Image_2025-08-27_at_23.50.23_fc5b094a_coryrj.jpg",
      value: "women"
    },
    {
      name: "For Him",
      image: "https://res.cloudinary.com/ravipadhiyar/image/upload/v1756319025/WhatsApp_Image_2025-08-27_at_23.41.35_f0ff2728_wzjhbq.jpg",
      value: "male"
    },
    {
      name: "Unisex",
      image: "https://res.cloudinary.com/ravipadhiyar/image/upload/v1756318998/WhatsApp_Image_2025-08-27_at_23.49.59_86b1546d_sitby8.jpg",
      value: "unisex"
    }
  ];

  const benefits = [
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Free Shipping",
      description: "Free shipping on orders over ₹50"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Authentic Products",
      description: "100% genuine fragrances guaranteed"
    },
    {
      icon: <HeartHandshake className="h-8 w-8" />,
      title: "Easy Returns",
      description: "30-day return policy"
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Gift Wrapping",
      description: "Complimentary luxury packaging"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* ------------------Hero Section------------------ */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-amber-900/90 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=1200')"
          }}
        ></div>

        <div className="relative z-20 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Discover Your
            <span className="block bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
              Signature Scent
            </span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-gray-200 leading-relaxed max-w-2xl mx-auto">
            Explore our curated collection of luxury fragrances from the world's most prestigious brands
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-amber-500 rounded-full text-white font-semibold hover:from-purple-700 hover:to-amber-600 transform hover:scale-105 transition-all duration-200 shadow-2xl"
            >
              Shop Now
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 border-2 border-white rounded-full text-white font-semibold hover:bg-white hover:text-gray-900 transition-all duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------Categories Section ----------------------*/}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Find the perfect fragrance for every occasion and personality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/products/?category=${category.value}`}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="aspect-w-16 aspect-h-20 relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-80 object-center  group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* -----------------------Featured Products ----------------------- */}

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Our most loved fragrances, carefully selected for their exceptional quality and appeal
            </p>
          </div>

          {/*----------------------- featured product container----------------------- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {
              loading ?
                <div className="col-span-full flex justify-center items-center h-[40vh]">
                  <Loader />
                </div>
                :
                product.map((product) =>
                  <FeatureProductcart key={product._id} product={product} />
                )
            }
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-amber-500 text-white rounded-full font-semibold hover:from-purple-700 hover:to-amber-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* ----------------------- Benefits Section ----------------------- */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600 group-hover:from-purple-600 group-hover:to-amber-500 group-hover:text-white transition-all duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*----------------------- Newsletter Section----------------------- */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-purple-900 to-amber-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Stay Updated with LuxeScent
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Be the first to know about new arrivals, exclusive offers, and fragrance tips
          </p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full focus:outline-none focus:ring-4 focus:ring-purple-300 text-gray-900"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-white text-purple-900 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;