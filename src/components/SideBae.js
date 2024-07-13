import { Link } from "react-router-dom";

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
      <Link
        to="/dashboard/users"
        className="bg-gray-100 text-lg font-normal text-black w-full inline-block p-2 rounded-md border border-transparent hover:border-[#4a9dec] hover:bg-transparent transition-all"
      >
        users
      </Link>
    </div>
  );
}
