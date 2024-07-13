import { Link } from "react-router-dom";
export default function TopBar() {
  const OpenSideBar = () => {
    console.log(document.getElementById("menuDashBoard"));
    document.getElementById("menuDashBoard").classList.toggle("-left-full");
  };
  return (
    <div className=" p-2 shadow-md">
      <div className="container m-auto flex items-center justify-between">
        <div className="logo font-bold">
          <span className="inline-block md:hidden">
            <i className="fa-solid fa-bars me-2 " onClick={OpenSideBar}></i>
          </span>

          <a href="">
            <i className="fa-solid fa-microchip fa-lg text-[#688cca]"></i>{" "}
            TECHNO
            <span className="ms-1 text-[#688cca]">ZONE</span>
          </a>
        </div>
        <Link
          to="/"
          className="bg-gradient-to-tr opacity-100 from-[#4a9dec] to-[#c2e9fb] text-white px-2 py-1 rounded-lg hover:opacity-75 transition-all me-3"
        >
          go to website
        </Link>
      </div>
    </div>
  );
}
