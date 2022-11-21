import { Link } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import { useCart } from "../../providers/CartProvider";
import "./checkout.css";

const Checkout = () => {
  const auth = useAuth();
  const { cart, total } = useCart();

  if (!cart.length)
    return (
      <main className="container">
        <Link to="/">Go to shopping</Link>
      </main>
    );
  return (
    <main className="container">
      {auth ? (
        <section className="cartCenter">
          <section className="cartItemList">
            <h3>Checkout Details:</h3>
            <p>user: {auth.user}</p>
            <p>email: {auth.email}</p>
            <p>tel: {auth.phoneNumber}</p>
          </section>
          <section className="cartSummary">
            <h3>Your Order: </h3>
            {cart &&
              cart.map((c) => {
                return (
                  <div>
                    {c.name} * {c.quantity} = {c.quantity * c.offPrice}
                  </div>
                );
              })}
            <hr />
            <div>total price: {total}</div>
          </section>
        </section>
      ) : (
        <div>
          please login!
          <p>
            <Link to="/login"> Go to the login Page</Link>
          </p>
        </div>
      )}
    </main>
  );
};

export default Checkout;
