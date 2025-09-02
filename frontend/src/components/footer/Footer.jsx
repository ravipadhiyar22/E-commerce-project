import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="col-span-1 lg:col-span-1">
                        <Link to="/" className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-amber-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-sm">L</span>
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
                                LuxeScent
                            </span>
                        </Link>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Discover the world's finest fragrances. From timeless classics to modern masterpieces,
                            we bring you luxury scents that define your unique style.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors duration-200">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors duration-200">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors duration-200">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors duration-200">
                                <Youtube className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                                    Gift Cards
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Customer Service</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                                    Shipping Info
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                                    Returns & Exchanges
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                                    Size Guide
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Get in Touch</h3>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 text-purple-400" />
                                <span className="text-gray-400">+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 text-purple-400" />
                                <span className="text-gray-400">hello@luxescent.com</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <MapPin className="h-5 w-5 text-purple-400" />
                                <span className="text-gray-400">123 Luxury Ave, NYC 10001</span>
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="mt-6">
                            <h4 className="text-md font-medium mb-3 text-white">Subscribe to Newsletter</h4>
                            <form className="flex">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                                />
                                <button
                                    type="submit"
                                    className="px-1 py-2 bg-gradient-to-r from-purple-600 to-amber-500 rounded-r-lg hover:from-purple-700 hover:to-amber-600 transition-all duration-200 font-medium"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm">
                        © 2025 LuxeScent. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 sm:mt-0">
                        <a href="#" className="text-gray-400 hover:text-purple-400 text-sm transition-colors duration-200">
                            Terms of Service
                        </a>
                        <a href="#" className="text-gray-400 hover:text-purple-400 text-sm transition-colors duration-200">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-gray-400 hover:text-purple-400 text-sm transition-colors duration-200">
                            Cookie Policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;