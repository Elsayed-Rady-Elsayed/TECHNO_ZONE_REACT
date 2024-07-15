import { useContext, useEffect, useReducer, useState } from "react";
import { json, Link, useNavigate } from "react-router-dom";
import { User } from "../pages/client/context/Context";
import Cookies from "universal-cookie";
import Axios from "axios";
import { LOGOUTAPIURL } from "../helper/links";
export default function Header(props) {
  const cookie = new Cookies();
  const userToken = cookie.get("Bearer");
  const nav = useNavigate();
  const LOGOUT = async () => {
    await Axios.post(LOGOUTAPIURL, null, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + userToken,
      },
    });
    cookie.remove("Bearer");
    nav("/");
    document.getElementById("showUserInfoCard").classList.add("hidden");
  };

  const showUserLoginedCard = () => {
    document.getElementById("showUsercart").classList.add("hidden");
    document.getElementById("showUserInfoCard").classList.toggle("hidden");
  };

  const showUserLoginedCart = () => {
    document.getElementById("showUsercart").classList.toggle("hidden");
    document.getElementById("showUserInfoCard").classList.add("hidden");
  };

  const { name } = window.localStorage.getItem("user")
    ? JSON.parse(window.localStorage.getItem("user"))
    : "";

  const openNavBar = () => {
    if (document.getElementById("NavBar").style.height == "") {
      document.getElementById("NavBar").style.height = "190px";
    } else {
      document.getElementById("NavBar").style.height = "";
    }
  };

  function cartReducer(state, action) {
    switch (action.type) {
      case "remove":
        return state.filter((el) => el.item.id !== action.payload.item.id);
      case "return":
        return action.payload;
      default:
        return state;
    }
  }

  useEffect(() => {
    dispatch({ type: "return", payload: props.cartList });
  }, [props.cartList]);
  const [cart, dispatch] = useReducer(cartReducer, []);
  const removeFromCart = (item) => {
    dispatch({ type: "remove", payload: item });
  };
  const renderProducts = cart.map((product, idx) => {
    return (
      <div
        key={idx}
        className="border border-gray-200 p-1 relative"
        style={{ height: "250px" }}
      >
        <img
          className="object-cover w-full h-2/4"
          src={product.item.image}
          style={
            {
              // height: "200px",
            }
          }
        />
        <h2>{product.item.title}</h2>
        <p>count: {product.count}</p>
        <p className="text-sm text-gray-400">{product.item.description}</p>
        <button
          className="bg-red-500 w-full text-white mb-0"
          onClick={() => removeFromCart(product)}
        >
          remove from cart
        </button>
      </div>
    );
  });
  return (
    <div className="bg-transparent p-4 shadow-md relative">
      <div
        id="showUserInfoCard"
        className="absolute z-50 right-2 md:left-[77%] w-52 top-full m-0.5 shadow-lg p-2 bg-white hidden"
      >
        <h2 className="p-2">{name}</h2>
        <hr />
        <h2 className="p-2">profile</h2>
        <hr />
        <Link
          onClick={LOGOUT}
          to="/"
          className="bg-red-500 mt-2 text-white flex items-center justify-between py-1 px-2 rounded-lg w-full transition-all border border-transparent hover:bg-transparent hover:text-red-500 hover:border hover:border-red-500"
        >
          <span>logout</span>
          <i className="fa-solid fa-arrow-right-from-bracket text-inherit"></i>
        </Link>
      </div>
      <div
        id="showUsercart"
        className="absolute right-2 z-50 md:left-[77%] w-52 top-full m-0.5 shadow-lg p-2 bg-white hidden"
      >
        <h2 className="p-2">cart</h2>
        <hr />
        <div className="grid grid-cols-1">{renderProducts}</div>
      </div>
      <div className="container m-auto flex gap-3 md:gap-10 justify-between items-center">
        <div className="logo font-bold">
          <span className="inline-block md:hidden">
            <i className="fa-solid fa-bars me-2 " onClick={openNavBar}></i>
          </span>
          <Link to="/">
            <i className="fa-solid fa-microchip fa-lg text-[#688cca]"></i>{" "}
            TECHNO
            <span className="ms-1 text-[#688cca]">ZONE</span>
          </Link>
        </div>
        <nav
          id="NavBar"
          className="overflow-hidden md:h-fit transition-all absolute left-0 shadow-lg top-full w-full z-50 bg-white md:shadow-none md:p-0 md:static md:flex-1 md:block"
        >
          <ul className="flex gap-3 flex-col  md:flex-row md:gap-6">
            <li className="hover:bg-gray-200 rounded-lg p-2 md:p-1">
              <Link to="/">Home</Link>
            </li>
            <hr className="md:hidden" />
            <li className="hover:bg-gray-200 rounded-lg p-2 md:p-1">
              <Link to="/aboutUs">About Us</Link>
            </li>
            <hr className="md:hidden" />
            <li className="hover:bg-gray-200 rounded-lg p-2 md:p-1">
              <Link to="/services">Services</Link>
            </li>
          </ul>
        </nav>
        {userToken ? (
          <div className="flex items-center">
            <i
              onClick={showUserLoginedCard}
              className="fa-regular fa-circle-user text-[#74C0FC] me-2 mt-1"
            ></i>
            <span className="me-2 mt-1 relative" onClick={showUserLoginedCart}>
              <p
                className="cursor-pointer absolute -top-1 -right-1 bg-black text-white rounded-full p-0.5 w-3 h-3 text-center"
                style={{
                  fontSize: "7px",
                }}
              >
                {cart.length}
              </p>
              <i className="fa-solid fa-cart-shopping text-[#74C0FC] "></i>
            </span>
          </div>
        ) : (
          <div className="btnsContainer">
            <Link
              to="/register"
              className="bg-gradient-to-tr opacity-100 from-[#4a9dec] to-[#c2e9fb] text-white px-2 py-1 rounded-lg hover:opacity-75 transition-all me-3"
            >
              signup
            </Link>
            <Link
              to="/login"
              className="bg-gradient-to-tr opacity-100 from-[#4a9dec] to-[#c2e9fb] text-white px-2 py-1 rounded-lg hover:opacity-75 transition-all"
            >
              login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
