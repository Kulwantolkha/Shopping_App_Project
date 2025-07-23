import { Navbar } from "../components/Navbar";
import { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`api/v1/categories`);
        const result = await response.json();
        if (result.isSuccess) {
          setCategories(result.data.categories);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const addToCart = (category) => {
    console.log(`Added ${category} to cart`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      <div className="py-8 px-4 sm:px-10 max-w-5xl mx-auto w-full text-blue-900">
        <h2 className="text-4xl font-extrabold mb-8 text-center tracking-tight">Categories</h2>

        {categories.length === 0 ? (
          <p className="text-lg text-center">No categories found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {categories.map((category) => (
              <div
                key={category.id}
                className="border border-blue-100 rounded-2xl p-6 shadow-lg bg-white hover:shadow-2xl transition flex flex-col items-center"
              >
                <h3 className="text-xl font-semibold mb-4 text-center">{category.name}</h3>
                <button
                  onClick={() => addToCart(category.name)}
                  className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-xl transition flex items-center gap-2 mt-4 w-full justify-center font-semibold shadow"
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { CategoriesPage };
