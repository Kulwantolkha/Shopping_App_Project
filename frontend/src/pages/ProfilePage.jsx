import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { useMyContext } from "../context/MyContext";
import { FaUserCircle } from "react-icons/fa";

const ProfilePage = () => {
  const { user, setCount } = useMyContext();
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState(-1);

  const getData = async () => {
    try {
      const resp = await fetch(`/api/v1/products`, {
        method: "GET",
      });
      const result = await resp.json();
      setProducts(result.data.products);
    } catch (err) {
      console.warn("Error while getting products ---> ", err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (elem) => {
    try {
      elem.preventDefault();
      const title = elem.target.title.value;
      const price = elem.target.price.value;
      const description = elem.target.description.value;
      const quantity = elem.target.quantity.value;
      const rating = elem.target.rating.value;

      const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products`, {
        method: "POST",
        body: JSON.stringify({
          title,
          price,
          description,
          quantity,
          rating,
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      if (resp.status == "201") {
        alert("Product Added!");
        getData();
      } else {
        const result = await resp.json();
        alert(`Invalid Data: ${result.message}`);
      }
    } catch (err) {
      console.warn("Cannot create product ---> ", err.message);
      alert(`Cannot createproduct: ${err.message}`);
    }
  };

  const handleEditProduct = async (productId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/products/${productId}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            price: updatedPrice,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        alert("product Updated");
        setEditProductId("");
        getData();
      } else {
        const result = await res.json();
        alert(`Error while updating product: ${result.message}`);
      }
    } catch (err) {
      alert(`cannot update product: ${err.message}`);
      console.log("cannot update product: ", err.message);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      {/* Profile Card */}
      <div className="flex flex-col items-center justify-center mt-8 mb-12">
        <div className="bg-white border border-blue-100 rounded-2xl shadow-lg px-10 py-8 flex flex-col items-center w-full max-w-lg">
          <div className="w-24 h-24 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-6xl shadow mb-4">
            <FaUserCircle />
          </div>
          <h2 className="text-3xl font-extrabold text-blue-900 mb-2">{user.name || "User"}</h2>
          <p className="text-lg text-blue-700 mb-1">{user.email}</p>
          <p className="text-base text-blue-400">Welcome to your profile page.</p>
        </div>
      </div>
    </div>
  );
};

export { ProfilePage };
