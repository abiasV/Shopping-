import { NavLink } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import { useCart } from "../../providers/CartProvider";
import "./Navigation.css";

const Navigation = () => {
  const { cart } = useCart();
  const userData = useAuth();
  return (
    <header className="mainNavigation">
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              end
              className={(navData) => (navData.isActive ? "activeLink" : "")}
            >
              Home
            </NavLink>
          </li>
          <li className="budget">
            <NavLink
              to="/cart"
              className={(navData) => (navData.isActive ? "activeLink" : "")}
            >
              Cart
            </NavLink>
            <span>{cart.length}</span>
          </li>
          <li>
            <NavLink
              to={userData ? "/profile" : "/login"}
              className={(navData) => (navData.isActive ? "activeLink" : "")}
            >
              {userData ? "Profile" : "Login"}
            </NavLink>
          </li>
        </ul>
        <div>Abbas Shopping</div>
      </nav>
    </header>
  );
};

export default Navigation;
