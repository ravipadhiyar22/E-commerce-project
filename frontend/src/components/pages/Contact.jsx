import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
    alert('Thank you for your message! We\'ll get back to you soon.');
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      details: ["+1 (555) 123-4567", "+1 (555) 123-4568"],
      description: "Mon-Fri 9AM-6PM EST"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      details: ["hello@luxescent.com", "support@luxescent.com"],
      description: "We'll respond within 24 hours"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Address",
      details: ["123 Luxury Avenue", "New York, NY 10001"],
      description: "Visit our flagship store"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Store Hours",
      details: ["Mon-Sat: 10AM-8PM", "Sunday: 12PM-6PM"],
      description: "Eastern Standard Time"
    }
  ];

  const faqs = [
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days, while express shipping takes 1-2 business days. Free shipping is available on orders over ₹50."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for unopened items in their original packaging. Custom or personalized items are final sale."
    },
    {
      question: "Are your fragrances authentic?",
      answer: "Yes, all our fragrances are 100% authentic and sourced directly from authorized distributors and brand partners."
    },
    {
      question: "Do you offer gift wrapping?",
      answer: "Yes, we offer complimentary luxury gift wrapping for all orders. You can select this option during checkout."
    },
    {
      question: "Can I test fragrances before buying?",
      answer: "Yes, we offer sample sets and discovery kits so you can try fragrances before committing to a full-size bottle."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-r from-purple-900 to-amber-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Get in Touch
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-purple-100 leading-relaxed max-w-3xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600">
                  {info.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{info.title}</h3>
                <div className="space-y-1 mb-3">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-700 font-medium">{detail}</p>
                  ))}
                </div>
                <p className="text-gray-600 text-sm">{info.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-sm">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                Send us a Message
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="product">Product Question</option>
                    <option value="order">Order Support</option>
                    <option value="return">Returns & Exchanges</option>
                    <option value="wholesale">Wholesale Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-vertical"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-amber-500 text-white py-4 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-amber-600 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Send className="h-5 w-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>

            {/* Map and Additional Info */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Visit Our Store</h3>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-6">
                  <div className="text-center text-gray-500">
                    <MapPin className="h-12 w-12 mx-auto mb-2" />
                    <p className="font-medium">Interactive Map</p>
                    <p className="text-sm">123 Luxury Avenue, NYC</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-purple-600 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Address</p>
                      <p className="text-gray-600">123 Luxury Avenue<br />New York, NY 10001</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-purple-600 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Store Hours</p>
                      <p className="text-gray-600">
                        Mon-Sat: 10:00 AM - 8:00 PM<br />
                        Sunday: 12:00 PM - 6:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Links</h3>
                <div className="space-y-4">
                  <a href="/products" className="block text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200">
                    Browse Our Collection →
                  </a>
                  <a href="#" className="block text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200">
                    Shipping Information →
                  </a>
                  <a href="#" className="block text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200">
                    Returns & Exchanges →
                  </a>
                  <a href="#" className="block text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200">
                    Size Guide →
                  </a>
                  <a href="#" className="block text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200">
                    Gift Cards →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-lg">
              Find answers to the most common questions about our products and services
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <details key={index} className="group bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors duration-200">
                <summary className="flex justify-between items-center cursor-pointer">
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                  <div className="text-purple-600 group-open:rotate-45 transition-transform duration-200">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                </summary>
                <div className="mt-4 text-gray-700 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;