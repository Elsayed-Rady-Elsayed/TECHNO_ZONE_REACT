import Header from "../../components/Header";
import { useContext, useEffect, useReducer, useState } from "react";
import { User } from "./context/Context";
import { GETALLPRODUCTSAPIURL } from "../../helper/links";
import Cookies from "universal-cookie";

export default function Home() {
  document.title = "Home";
  const u = useContext(User);

  const cookie = new Cookies();

  const CookieToken = cookie.get("Bearer");

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(GETALLPRODUCTSAPIURL, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + CookieToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const findAllSimmilerInCart = (l, item) => {
    let n = 0;
    l.forEach((el) => {
      if (el == l) {
        n++;
      }
    });
    return n;
  };
  function cartReducer(state, action) {
    switch (action.type) {
      case "add":
        const existingItemIndex = state.findIndex(
          (el) => el.item.id === action.payload.id
        );
        if (existingItemIndex !== -1) {
          return state.map((el, index) =>
            index === existingItemIndex ? { ...el, count: el.count + 1 } : el
          );
        } else {
          return [
            ...state,
            {
              item: action.payload,
              count: 1,
            },
          ];
        }
      case "remove":
        return state.filter((el) => el.item.id !== action.payload.id);
      default:
        return state;
    }
  }
  const [cart, dispatch] = useReducer(cartReducer, []);
  // console.log(cart);

  const addToCart = (item) => {
    dispatch({ type: "add", payload: item });
  };

  const removeFromCart = (item) => {
    dispatch({ type: "remove", payload: item });
  };

  const renderProducts = products.map((product, idx) => {
    return (
      <div
        key={idx}
        className="border border-gray-200 p-2 relative"
        style={{ height: "230px" }}
      >
        <div className="absolute top-2 right-5">
          <button onClick={() => addToCart(product)}>
            <i className="fa-solid fa-cart-shopping text-white"></i>
          </button>
        </div>
        <img
          className="object-cover w-full h-2/3"
          src={product.image}
          style={
            {
              // height: "200px",
            }
          }
        />
        <h2>{product.title}</h2>
        <p className="text-sm text-gray-400">{product.description}</p>
      </div>
    );
  });
  return (
    <div>
      <Header cartList={cart} />
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5  gap-2 container m-auto py-2 ">
        {renderProducts}
      </div>
      <h2>home</h2>
    </div>
  );
}
