import Layout from "../layout/Layout";
import * as data from "../data";
import { useCart, useCartActions } from "../providers/CartProvider";
import { checkInCart } from "../utils/checkInCart";
import { toast } from "react-toastify";


const HomePage = () => {
  const { cart } = useCart();
  const dispatch = useCartActions();
  const addProductHandler = (product) => {
    // console.log(product);
    toast.success(`${product.name} added!`)
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <Layout>
      <main className="container">
        <section className="productList">
          {data.products.map((product) => {
            return (
              <section key={product.id} className="product">
                <div className="productImg">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="productDesc">
                  <p>{product.name}</p>
                  <p style={{ fontWeight: "bold" }}>${product.price}</p>
                  <button
                    className="btn primary"
                    onClick={() => addProductHandler(product)}
                  >
                    {checkInCart(cart, product) ? "In cart" : "Add to Cart"}
                  </button>
                </div>
              </section>
            );
          })}
        </section>
      </main>
    </Layout>
  );
};

export default HomePage;
