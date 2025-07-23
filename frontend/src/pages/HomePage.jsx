import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import "../index.css";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { useMyContext } from "../context/MyContext";

const HomePage = () => {
  const { addToCart, cart } = useMyContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`api/v1/products`);
        const result = await response.json();
        if (result.isSuccess) {
          setProducts(result.data.products);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCartHandler = (product) => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      <div className="py-8 px-4 sm:px-10 max-w-6xl mx-auto w-full text-blue-900">
        <h2 className="text-4xl font-extrabold mb-8 text-center tracking-tight">All Products</h2>

        {loading ? (
          <p className="text-lg text-center">Loading...</p>
        ) : products.length === 0 ? (
          <p className="text-lg text-center">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {products.map((product) => (
              <div
                key={product._id}
                className="border border-blue-100 rounded-2xl p-6 shadow-lg bg-white hover:shadow-2xl transition flex flex-col items-center"
              >
                <img
                  src={product.thumbnail || product.images[0]}
                  alt={product.title}
                  className="w-full h-56 object-contain rounded-xl mb-4 bg-blue-50"
                  style={{ objectFit: "contain" }}
                />
                <h3 className="text-xl font-semibold mb-2 text-center">{product.title}</h3>
                <p className="text-sm text-blue-700 mb-2 text-center">{product.description}</p>
                <p className="font-medium text-blue-900 mb-1 text-center">
                  <FaShoppingCart className="inline-block text-blue-700 mr-2" />
                  <strong>Price:</strong> ${product.price}
                </p>
                <p className="font-medium text-blue-900 text-center">
                  <FaStar className="inline-block text-blue-700 mr-2" />
                  <strong>Rating:</strong> {product.rating}
                </p>
                <button
                  onClick={() => addToCartHandler(product)}
                  className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-xl transition flex items-center gap-2 mt-6 w-full justify-center font-semibold shadow"
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <div className="mt-12 max-w-2xl mx-auto w-full">
            <h2 className="text-3xl font-bold mb-4 text-center">Cart</h2>
            <ul className="list-disc pl-5">
              {cart.map((item, index) => (
                <li key={index} className="text-lg mb-2">
                  {item.productId?.title || "Unknown Product"} - ${item.productId?.price || "-"} x {item.quantity}
                </li>
              ))}
            </ul>
            <button
              className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-xl transition mt-6 w-full font-semibold shadow"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export { HomePage };