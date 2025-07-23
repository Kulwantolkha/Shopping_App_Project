import { useNavigate, Link } from "react-router";
import { useMyContext } from "../context/MyContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const Navbar = () => {
  const { count, user, logout } = useMyContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleNavigation = (path) => {
    if (!user.isLoggedIn && path !== "/") {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      toast.success("Logged out successfully!", { autoClose: 3000 });
      navigate("/login");
    } catch (error) {
      toast.error("Failed to log out. Please try again.", { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="w-full max-w-7xl flex justify-between items-center px-8 py-3 bg-gradient-to-r from-blue-700 to-blue-600 rounded-2xl mt-4 mb-8 shadow-xl mx-auto z-50">
      <Link
        to="/"
        className="text-3xl font-extrabold text-white tracking-wide cursor-pointer drop-shadow-lg hover:scale-105 transition-all"
      >
        🛒 ShopEase
      </Link>

      <div className="flex items-center gap-4 ml-auto text-white font-medium">
        <button
          onClick={() => handleNavigation("/")}
          className="hover:bg-white/90 hover:text-blue-800 transition px-4 py-2 rounded-xl text-base shadow font-semibold"
        >
          Home
        </button>
        <button
          onClick={() => handleNavigation("/categories")}
          className="hover:bg-white/90 hover:text-blue-800 transition px-4 py-2 rounded-xl text-base shadow font-semibold"
        >
          Categories
        </button>
        <button
          onClick={() => handleNavigation("/cart")}
          className="hover:bg-white/90 hover:text-blue-800 transition px-4 py-2 rounded-xl text-base shadow font-semibold"
        >
          Cart
        </button>

        {user.isLoggedIn ? (
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 bg-white text-blue-700 rounded-full flex items-center justify-center font-bold text-lg shadow-md border border-blue-200 cursor-pointer hover:ring-2 hover:ring-blue-400 transition"
              title="Profile"
              onClick={() => handleNavigation("/profile")}
            >
              {user.email ? user.email.charAt(0).toUpperCase() : "?"}
            </div>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-700 hover:bg-blue-800 hover:text-white px-5 py-2 rounded-xl transition font-bold shadow-md text-base border border-blue-100"
              disabled={loading}
            >
              {loading ? "Logging out..." : "Logout"}
            </button>
          </div>
        ) : (
          <button
            onClick={() => handleNavigation("/login")}
            className="hover:bg-white/90 hover:text-blue-800 transition px-5 py-2 rounded-xl text-base font-semibold shadow"
          >
            Sign In
          </button>
        )}
      </div>

      <ToastContainer autoClose={5000} closeOnClick pauseOnHover draggable />
    </nav>
  );
};

export { Navbar };
