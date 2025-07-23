import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router";
import { HomePage } from "./pages/HomePage";
import { CartPage } from "./pages/CartPage";
import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProfilePage } from "./pages/ProfilePage";
import { SearchPage } from "./pages/SearchPage";
import { SignupPage } from "./pages/SignupPage";
import { ViewPage } from "./pages/ViewPage";
import { CategoriesPage } from "./pages/CategoriesPage";
import { useMyContext } from "./context/MyContext";
import { useEffect } from "react";

const AppRoutes = () => {
  const { user, appLoading } = useMyContext();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!appLoading && user.isLoggedIn && (location.pathname === "/login" || location.pathname === "/signup")) {
      navigate("/", { replace: true });
    }
  }, [appLoading, user.isLoggedIn, location.pathname, navigate]);

  if (appLoading) {
    return (
      <div className="min-h-[100vh] flex items-center content-center">
        <div className="text-black text-5xl">Loading...</div>
      </div>
    );
  }

  const { isLoggedIn } = user;
  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/view" element={<ViewPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;