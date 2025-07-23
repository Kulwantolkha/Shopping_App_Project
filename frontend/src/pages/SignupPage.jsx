import { Navbar } from "../components/Navbar.jsx";
import { Link, useNavigate } from "react-router";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUserAlt, FaEnvelope, FaLock, FaVenusMars } from "react-icons/fa";

const SignupPage = () => {
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const gender = e.target.gender.value;

    const dataObj = {
      name,
      email,
      password,
      gender,
    };

    try {
      const resp = await fetch(`/api/v1/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataObj),
      });

      const result = await resp.json();

      if (resp.status === 201) {
        toast.success("Registration Successful");
        navigate("/login");
      } else {
        toast.error("Registration Error: " + (result.message || "Unknown error"));
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
        onSubmit={handleRegister}
      >
        <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-6">Sign Up</h2>

        <div className="flex flex-col gap-4">
          <label htmlFor="name" className="text-sm font-medium text-blue-900 flex items-center gap-2">
            <FaUserAlt className="text-blue-700" /> Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="py-3 px-4 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900"
            required
          />
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="email" className="text-sm font-medium text-blue-900 flex items-center gap-2">
            <FaEnvelope className="text-blue-700" /> Email
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

        <div className="flex flex-col gap-4">
          <label htmlFor="gender" className="text-sm font-medium text-blue-900 flex items-center gap-2">
            <FaVenusMars className="text-blue-700" /> Gender
          </label>
          <select
            id="gender"
            name="gender"
            className="py-3 px-4 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl transition font-semibold shadow-md hover:shadow-lg"
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-blue-700 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-700 hover:underline font-medium">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export { SignupPage };