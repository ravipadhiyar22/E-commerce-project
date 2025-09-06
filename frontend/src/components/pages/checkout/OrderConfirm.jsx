import { CheckCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function OrderConfirm() {
  const location = useLocation();
  const { orderId } = location.state || {}; // get orderId passed from navigate

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
      {/* ✅ Tick Icon */}
      <CheckCircle className="h-24 w-24 text-green-500 mb-6" />

      {/* Confirmation Text */}
      <h1 className="text-3xl font-bold text-gray-800">Order Confirmed!</h1>
      <p className="text-gray-600 mt-2">
        Thank you for your purchase. Your order has been placed successfully.
      </p>

      {/* Order ID */}
      {orderId && (
        <div className="mt-4 bg-white shadow-md rounded-lg px-6 py-4">
          <p className="text-gray-700 font-medium">
            Order ID: <span className="text-purple-600">{orderId}</span>
          </p>
        </div>
      )}

      {/* Back to Products */}
      <Link
        to="/products"
        className="mt-8 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
