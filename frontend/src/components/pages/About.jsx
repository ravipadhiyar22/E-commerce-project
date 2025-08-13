import React from 'react';
import { Award, Heart, Leaf, Users, Star } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Passion for Excellence",
      description: "We are passionate about creating exceptional fragrances that inspire and delight our customers every day."
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Sustainable Beauty",
      description: "Committed to eco-friendly practices and sustainable sourcing of our premium fragrance ingredients."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Customer First",
      description: "Our customers are at the heart of everything we do, driving us to provide unparalleled service and quality."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Quality Assured",
      description: "Every fragrance undergoes rigorous testing to ensure we deliver only the finest quality products."
    }
  ];

  const team = [
    {
      name: "Elena Rodriguez",
      role: "Founder & Master Perfumer",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "With over 15 years in luxury fragrance creation, Elena brings her passion for scent artistry to every LuxeScent creation."
    },
    {
      name: "Marcus Chen",
      role: "Creative Director",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Marcus leads our creative vision, ensuring each fragrance tells a unique story and connects with our customers' emotions."
    },
    {
      name: "Sophia Williams",
      role: "Quality Assurance Manager",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Sophia ensures every bottle meets our exacting standards, maintaining the quality that LuxeScent is known for."
    }
  ];

  const stats = [
    { number: "50,000+", label: "Happy Customers" },
    { number: "200+", label: "Unique Fragrances" },
    { number: "15", label: "Years of Excellence" },
    { number: "25", label: "Countries Served" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Loyal Customer",
      content: "LuxeScent has completely transformed my fragrance collection. Their attention to detail and quality is unmatched.",
      rating: 5
    },
    {
      name: "Michael Davis",
      role: "Fragrance Enthusiast",
      content: "I've been collecting fragrances for years, and LuxeScent consistently delivers the most unique and high-quality scents.",
      rating: 5
    },
    {
      name: "Emma Thompson",
      role: "Beauty Blogger",
      content: "As someone who reviews fragrances professionally, I can confidently say LuxeScent is setting new standards in the industry.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-amber-900"></div>
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=1200')"
          }}
        ></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Our Story of
            <span className="block bg-gradient-to-r from-purple-300 to-amber-300 bg-clip-text text-transparent">
              Fragrance Excellence
            </span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-purple-100 leading-relaxed max-w-3xl mx-auto">
            For over 15 years, LuxeScent has been crafting exceptional fragrances that capture the essence of luxury and sophistication
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                The Beginning of Our Journey
              </h2>
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  LuxeScent was born from a simple belief: that fragrance is more than just a scent – 
                  it's a personal expression, a memory maker, and a confidence booster. Founded in 2010 
                  by master perfumer Elena Rodriguez, our journey began in a small atelier in Paris.
                </p>
                <p>
                  What started as a passion project has grown into a globally recognized brand, 
                  yet we've never lost sight of our core mission: to create exceptional fragrances 
                  that resonate with the soul and celebrate individuality.
                </p>
                <p>
                  Today, we continue to handcraft each fragrance with the same attention to detail 
                  and commitment to quality that defined our very first creation. Every bottle tells 
                  a story, and we're honored to be part of yours.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1179760/pexels-photo-1179760.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Perfume making process"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-purple-600 to-amber-500 rounded-2xl opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              These core principles guide everything we do, from fragrance creation to customer service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600 group-hover:from-purple-600 group-hover:to-amber-500 group-hover:text-white transition-all duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-purple-900 to-amber-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-purple-100 text-lg max-w-2xl mx-auto">
              These numbers reflect our commitment to excellence and the trust our customers place in us
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-purple-200 text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              The passionate individuals behind every LuxeScent creation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-purple-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Don't just take our word for it – hear from our satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-purple-600 to-amber-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Find Your Signature Scent?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Explore our collection of luxury fragrances and discover the perfect scent that tells your unique story
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Shop Our Collection
            </a>
            <a
              href="/contact"
              className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-all duration-200"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;