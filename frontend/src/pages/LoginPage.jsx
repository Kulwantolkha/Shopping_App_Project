import { Link, useNavigate } from "react-router";
import { Navbar } from "../components/Navbar.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useMyContext } from "../context/MyContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { getUser } = useMyContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const dataObj = {
      email,
      password,
    };
    try {
      const resp = await fetch(`/api/v1/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataObj),
      });

      const result = await resp.json();
      console.log(result);
      console.log(resp);

      if (resp.status === 200) {
        toast.success("Login Successful");
        await getUser();
        navigate("/");
      } else {
        toast.error("Login Error: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      <form
        className="max-w-md w-full mx-auto mt-12 bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6 border border-blue-100"
        onSubmit={handleLogin}
      >
        <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-6">Login</h2>

        <div className="flex flex-col gap-4">
          <label htmlFor="email" className="text-sm font-medium text-blue-900 flex items-center gap-2">
            <FaUserAlt className="text-blue-700" /> Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="py-3 px-4 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900"
            required
          />
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="password" className="text-sm font-medium text-blue-900 flex items-center gap-2">
            <FaLock className="text-blue-700" /> Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="py-3 px-4 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl transition font-semibold shadow-md hover:shadow-lg"
        >
          Login
        </button>

        <p className="text-center text-sm text-blue-700 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-700 hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export { LoginPage };