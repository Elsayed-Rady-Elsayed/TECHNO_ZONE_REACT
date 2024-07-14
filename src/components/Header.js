import { useContext } from "react";
import { json, Link } from "react-router-dom";
export default function Header() {
  const LOGOUT = () => {
    window.localStorage.removeItem("user");
    window.location.pathname = "/";
  };

  const showUserLoginedCard = () => {
    document.getElementById("showUserInfoCard").classList.toggle("hidden");
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

  return (
    <div className="bg-transparent p-4 shadow-md relative">
      <div
        id="showUserInfoCard"
        className="absolute right-2 md:left-[77%] w-52 top-full m-0.5 shadow-lg p-2 bg-white hidden"
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
        {window.localStorage.getItem("user") ? (
          <div className="flex items-center">
            <i
              onClick={showUserLoginedCard}
              className="fa-regular fa-circle-user text-[#74C0FC] me-2 mt-1"
            ></i>
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
