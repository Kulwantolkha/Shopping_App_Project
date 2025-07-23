import { useEffect, useState, useRef } from "react";
import { MyContext } from "./MyContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyContextProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ isLoggedIn: false, name: "" });
  const [appLoading, setAppLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const welcomeToastShown = useRef(false);

  // Fetch user info and cart from backend
  const getUser = async () => {
    try {
      setAppLoading(true);
      const response = await fetch(`/api/v1/users`, {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      const { isSuccess, data } = result;
      if (isSuccess) {
        setUser({
          isLoggedIn: true,
          name: data.user.name || "",
          ...data.user,
        });
        // Only show welcome toast once per session
        if (!welcomeToastShown.current) {
          toast.dismiss();
          toast.success("Welcome back, " + (data.user.name || "User") + "!", { autoClose: 3000 });
          welcomeToastShown.current = true;
        }
        fetchCart();
      } else {
        toast.dismiss();
        toast.error("Please login again!", { autoClose: 3000 });
        setCart([]);
      }
    } catch (err) {
      toast.dismiss();
      toast.error("User validation failed: " + err.message, { autoClose: 3000 });
      setCart([]);
    } finally {
      setAppLoading(false);
    }
  };

  // Fetch cart from backend
  const fetchCart = async () => {
    try {
      const response = await fetch(`/api/v1/users/cart`, {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      if (result.isSuccess) {
        setCart(result.cart);
      } else {
        setCart([]);
      }
    } catch (err) {
      setCart([]);
      console.log(err);
    }
  };

  const logout = async () => {
    try {
      setAppLoading(true);
      await fetch(`/api/v1/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      setUser({ isLoggedIn: false, name: "" });
      setCart([]);
      toast.success("Logged out successfully!", { autoClose: 3000 });
    } catch (err) {
      toast.error("Logout failed: " + err.message, { autoClose: 3000 });
    } finally {
      setAppLoading(false);
    }
  };

  // Add to cart using backend
  const addToCart = async (product, quantity = 1) => {
    try {
      const response = await fetch(`/api/v1/users/cart`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product._id, quantity }),
      });
      const result = await response.json();
      if (result.isSuccess) {
        setCart(result.cart);
        toast.success(`${product.title} added to cart!`, { autoClose: 3000 });
      } else {
        toast.error(result.message || "Failed to add to cart", { autoClose: 3000 });
      }
    } catch (err) {
      toast.error("Failed to add to cart: " + err.message, { autoClose: 3000 });
    }
  };

  // Update cart item quantity
  const updateCartItem = async (productId, quantity) => {
    try {
      const response = await fetch(`/api/v1/users/cart`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      });
      const result = await response.json();
      if (result.isSuccess) {
        setCart(result.cart);
      } else {
        toast.error(result.message || "Failed to update cart", { autoClose: 3000 });
      }
    } catch (err) {
      toast.error("Failed to update cart: " + err.message, { autoClose: 3000 });
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(`/api/v1/users/cart/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const result = await response.json();
      if (result.isSuccess) {
        setCart(result.cart);
        // Fetch the latest cart to ensure UI is up to date
        fetchCart();
      } else {
        toast.error(result.message || "Failed to remove from cart", { autoClose: 3000 });
      }
    } catch (err) {
      toast.error("Failed to remove from cart: " + err.message, { autoClose: 3000 });
    }
  };

  // Clear cart (remove all items)
  const clearCart = async () => {
    if (!cart.length) return;
    for (const item of cart) {
      await removeFromCart(item.productId._id || item.productId);
    }
    toast.info("Cart cleared!", { autoClose: 3000 });
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  const valueObj = {
    count,
    setCount,
    user,
    appLoading,
    logout,
    cart,
    addToCart,
    clearCart,
    updateCartItem,
    removeFromCart,
    fetchCart,
    getUser,
  };
  return (
    <MyContext.Provider value={valueObj}>
      {children}
      <ToastContainer
        autoClose={3000}
        closeOnClick
        pauseOnHover
        draggable
        position="bottom-center"
      />
    </MyContext.Provider>
  );
};

export { MyContextProvider };