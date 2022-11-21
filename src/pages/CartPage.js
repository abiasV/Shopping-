import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
import { useCart, useCartActions } from "../providers/CartProvider";
import "./cartPage.css";

const CartPage = () => {
  const { cart, total } = useCart(); // const cartState = useCart();  // const {cart} = cartState;
  const dispatch = useCartActions();


  if (!cart.length)
    return (
      <Layout>
        <main>
          <h2>cart is empty !</h2>
        </main>
      </Layout>
    );

  const incHandler = (cartItem) => {
    dispatch({ type: "ADD_TO_CART", payload: cartItem });
  };

  const decHandler = (cartItem) => {
    dispatch({ type: "REMOVE_PRODUCT", payload: cartItem });
  };

  return (
    <Layout>
      <main className="container">
        <section className="cartCenter">
          <section className="cartItemList">
            {cart.map((item) => {
              return (
                <div className="cartItem" key={item.id}>
                  <div className="itemImg">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div>{item.name}</div>
                  <div>${item.offPrice * item.quantity}</div>
                  <div className="btnGroup">
                    <button onClick={() => decHandler(item)}>-</button>
                    <button>{item.quantity}</button>
                    <button onClick={() => incHandler(item)}>+</button>
                  </div>
                  {/* {item.quantity === 1 ? (
                      <button onClick={() => decHandler(item)}>Delete</button>
                    ) : (
                      <button onClick={() => decHandler(item)}>Minus</button>
                    )} */}
                </div>
              );
            })}
          </section>
          <CartSummary total={total} cart={cart} />
        </section>
      </main>
    </Layout>
  );
};

export default CartPage;

const CartSummary = ({ total, cart }) => {
  const originalTotalPrice = cart.length
    ? cart.reduce((final, val) => final + val.quantity * val.price, 0)
    : 0;
  return (
    <section className="cartSummary">
      <h2 style={{ marginBottom: "30px" }}>Cart Summary</h2>
      <div className="summaryItem">
        <p>original price</p>
        <p>${originalTotalPrice}</p>
      </div>
      <div className="summaryItem">
        <p>discount</p>
        <p>${originalTotalPrice - total}</p>
      </div>
      <hr />
      <div className="summaryItem">
        <p>total</p>
        <p>${total}</p>
      </div>
      <Link to="/signup?redirect=checkout">
        <button
          className="btn primary" style={{ marginTop: "20px", width: "100%" }}
        >
          Go to Checkout
        </button>
      </Link>
    </section>
  );
};
