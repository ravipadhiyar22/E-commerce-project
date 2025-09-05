import { useState, useEffect } from "react";
import api from "../../../api/axios.js"
import { useCart } from '../../../context/Cartcontext.jsx';
import { Minus, Plus, Trash2, ArrowRight, Shield } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";


function Address() {

  const usenavigate = useNavigate()
  const [form, setForm] = useState({
    houseno: "",
    street: "",
    building: "",
    socity: "",
    city: "",
    pincode: "",
  });

  const {
    cartItems,
    loadingstate,
    user,
    updateQuantity,
    removeItem,
    promoCode,
    isPromoApplied,
    applyPromoCode,
    subtotal,
    savings,
    discount,
    shipping,
    tax,
    total,
    setPromoCode } = useCart();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [success, setsuccess] = useState(false);
  const [error, seterror] = useState(undefined);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/checkout/addaddress", form);
      console.log(res);
      setsuccess(true);
      setForm({
        houseno: "",
        street: "",
        building: "",
        socity: "",
        city: "",
        pincode: "",
      });
      setTimeout(() => {
        setsuccess(false);
      }, 3000);
    } catch (error) {
      console.log(error.response)
      seterror(error.response?.data?.message);
      setTimeout(() => {
        seterror(undefined);
      }, 3000);
    }
  };


  const [address, setaddress] = useState([])
  useEffect(() => {

    const fetchaddress = async () => {
      try {
        const res = await api.get("/checkout/getaddress");
        console.log("this is fetched address", res.data.address)
        setaddress(res.data.address);
      } catch (error) {
        seterror(error.response?.data?.message);
        setTimeout(() => {
          seterror(undefined);
        }, 3000);
      }
    }
    fetchaddress();
  }, [])

  const [payment, setpayment] = useState("");
  const [selectedaddress, setselectedaddress] = useState("")


  function resitem({ productid, image, name, price, selling_price, quantity }) {
    const newarr = items.map((items) => ({
      productid: productid,
      productname: name,
      image: image,
      quantity: quantity,
      price: price,
      selling_price: selling_price
    }))
    return newarr;
  }

  // resitem();


  const handlechekout = async (e) => {
    try {

      if (!selectedaddress) {
        alert("plase select the address");
        return;
      }

      if (!payment) {
        alert("please select the payment");
        return;
      }


      const orderres = await api.post("/checkout/placeorder", { user: user._id, items: resitem(cartItems), paytype: payment, total, address: selectedaddress });

      if (orderres.status === 200) {
        usenavigate("/confirmorder")
      }

      
    } catch (error) {
      seterror(error?.response?.data?.message)

    }
  }




  // -----------------------------return---------------------------
  return (
    <div className="max-w-lvh mx-auto mt-10 p-4">
      <h2 className="text-2xl font-semibold mb-6">Add New Address</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* House No. & Street in one row */}
        <div className="grid grid-cols-2 gap-4">
          {/* ---------------house no---------------------- */}
          <div>
            <label className="block text-sm mb-1" htmlFor="houseno">
              House No.
            </label>
            <input
              type="text"
              id="houseno"
              name="houseno"
              value={form.houseno}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-black outline-none"
              placeholder="Enter house no."
            />
          </div>
          {/* ---------------street---------------------- */}

          <div>
            <label className="block text-sm mb-1" htmlFor="street">
              Street
            </label>
            <input
              type="text"
              id="street"
              name="street"
              value={form.street}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-black outline-none"
              placeholder="Enter street"
            />
          </div>
        </div>

        {/*----------------- Building ---------------------------*/}
        <div>
          <label className="block text-sm mb-1" htmlFor="building">
            Building
          </label>
          <input
            type="text"
            id="building"
            name="building"
            value={form.building}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-black outline-none"
            placeholder="Enter building"
          />
        </div>

        {/*----------------------- Society ----------------------*/}
        <div>
          <label className="block text-sm mb-1" htmlFor="socity">
            Society
          </label>
          <input
            type="text"
            id="socity"
            name="socity"
            value={form.socity}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-black outline-none"
            placeholder="Enter society"
          />
        </div>

        {/*----------------------------- City & Pincode ----------------------*/}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1" htmlFor="city">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={form.city}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-black outline-none"
              placeholder="Enter city"
            />
          </div>

          <div>
            <label className="block text-sm mb-1" htmlFor="pincode">
              Pincode
            </label>
            <input
              type="number"
              id="pincode"
              name="pincode"
              maxLength={6}
              value={form.pincode}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-black outline-none"
              placeholder="Enter pincode"
            />
          </div>
        </div>


        {/* ---------------submit address---------------------- */}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 hover:bg-gray-800 transition"
        >
          Save Address
        </button>
        <div className="h-6 mt-2">

          {success && (<p className="text-green-500 text-sm mt-2 fixed top-50 right-20">address add successfully</p>)}

        </div>
        {error && (<p className="text-red-500 fixed top-50 right-20">{error}</p>)}
      </form>

      {address !== undefined && <div>
        <h2 className="mt-6 text-lg font-medium">Address</h2>
        <p>choose and existting address</p>

        <div className="flex gap-20 mt-10">

          {address.map((address) => {
            console.log(address);
            console.log("this si cart ites", cartItems)
            return (
              // <div key={address}>
              //   <input type="radio" name="address" id={`${address._id}`} />
              //   <label htmlFor="address">{address.houseno}</label>
              // </div >

              <label key={address._id}>
                <input
                  type="radio"
                  name="address"
                  id="address"
                  value={address._id}
                  checked={selectedaddress === address._id}
                  onChange={() => setselectedaddress(address._id)}
                />
                <div>
                  <p className="font-medium">houseno: {address.houseno}, street: {address.street}</p>
                  <p className="font-medium"> building no: {address.building}</p>
                  <p className="font-medium">{address.socity},{address.city}</p>
                </div>
              </label>
            );
          })}
        </div>
      </div>
      }


      {/* -----------------------payment method---------------------------- */}
      <div className="max-w-lvh mx-auto mt-10 py-4 mb-4">
        <h2 className="mt-6 text-lg font-medium">Payment method</h2>
        <div>
          <input type="radio" name="payment" id="payment" value="cash" checked={payment === "cash"} onChange={(e) => setpayment(e.target.value)} />
          <label htmlFor="payment">cash</label>
        </div>
      </div>


      {/*----------- loop in cart products -----------*/}
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

      </div>

      {/* ---------------------------order summery---------------------- */}
      <div className="max-w-lvh mx-auto mt-10 py-4 mb-4">
        {  /* Order Summary */}
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

            <button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-amber-500 text-white py-4 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-amber-600 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg" onSubmit={handlechekout}>
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

  );
}

export default Address;
