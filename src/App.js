import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartProvider from "./providers/CartProvider";
import AuthProvider from "./providers/AuthProvider";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import Profile from "./pages/Profile";
import CheckOutPage from "./pages/CheckOutPage";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<CheckOutPage />} />
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
