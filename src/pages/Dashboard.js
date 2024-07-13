import { Outlet, Route } from "react-router-dom";
import SideBar from "../components/SideBae";
import TopBar from "../components/TopBar";
import Users from "./Users";

export default function Dashboard() {
  document.title = "Dashboard";
  return (
    <div>
      <TopBar />
      <div className="flex">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
}
