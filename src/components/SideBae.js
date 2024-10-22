import { Link, NavLink } from "react-router-dom";

export default function SideBar() {
  const CloseSideBar = () => {
    document.getElementById("menuDashBoard").classList.add("-left-full");
  };

  return (
    <div
      id="menuDashBoard"
      className="md:w-1/6 md:static shadow-md h-svh p-3 md:-left-0 -left-full absolute z-30 w-1/2 bg-white transition-all"
    >
      <div className="w-full text-end mb-2 md:hidden">
        <i className="fa-solid fa-xmark" onClick={CloseSideBar}></i>
      </div>
      <NavLink
        to="/dashboard/users"
        className=" text-lg font-normal text-black w-full inline-block p-2 rounded-md border border-transparent hover:bg-gray-100 transition-all"
      >
        users
      </NavLink>
      <NavLink
        to="/dashboard/users/create"
        className="mt-1 text-lg font-normal text-black w-full inline-block p-2 rounded-md border border-transparent  hover:bg-gray-100 transition-all"
      >
        new users
      </NavLink>
      <NavLink
        to="/dashboard/products"
        className="mt-1 text-lg font-normal text-black w-full inline-block p-2 rounded-md border border-transparent  hover:bg-gray-100 transition-all"
      >
        products
      </NavLink>
      <NavLink
        to="/dashboard/products/add"
        className="mt-1 text-lg font-normal text-black w-full inline-block p-2 rounded-md border border-transparent  hover:bg-gray-100 transition-all"
      >
        add product
      </NavLink>
    </div>
  );
}
