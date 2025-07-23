import { useEffect } from "react";
import { useMyContext } from "../context/MyContext";
import { Navbar } from "../components/Navbar";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import "../index.css";

const CartPage = () => {
  const { cart = [], removeFromCart, fetchCart } = useMyContext();

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line
  }, []);

  const handleCheckout = () => {
    console.log("Proceeding to checkout with items:", cart);
    // Implement checkout logic here
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      <div className="py-8 px-4 sm:px-10 max-w-3xl mx-auto w-full text-blue-900">
        <h2 className="text-4xl font-extrabold mb-8 flex items-center gap-2 justify-center tracking-tight">
          <FaShoppingCart className="text-blue-700" /> Cart
        </h2>

        {cart.length === 0 ? (
          <p className="text-lg text-center">Your cart is empty.</p>
        ) : (
          <div className="flex flex-col gap-8 max-w-2xl mx-auto">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex items-center bg-white rounded-2xl shadow-lg p-5 gap-6 border border-blue-100 hover:shadow-2xl transition"
              >
                <img
                  src={item.productId?.thumbnail || item.productId?.images?.[0] || "/no-image.png"}
                  alt={item.productId?.title || "Product"}
                  className="w-24 h-24 object-contain rounded-xl border bg-blue-50"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <h3 className="text-xl font-semibold mb-1 text-blue-900">{item.productId?.title || "Unknown Product"}</h3>
                  <p className="text-blue-700 mb-1">{item.productId?.description || "No description."}</p>
                  <div className="flex gap-8 items-center mt-2">
                    <span className="font-bold text-blue-900 text-lg">${item.productId?.price || "-"}</span>
                    <span className="text-blue-700">Qty: {item.quantity}</span>
                  </div>
                </div>
                <button
                  className="ml-4 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl flex items-center gap-2 transition font-semibold shadow"
                  title="Remove from cart"
                  onClick={() => removeFromCart(item.productId._id || item.productId)}
                >
                  <FaTrash /> Remove
                </button>
              </div>
            ))}
            <button
              onClick={handleCheckout}
              className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-xl transition mt-6 self-end font-semibold shadow"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export { CartPage };