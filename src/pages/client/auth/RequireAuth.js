import { useContext } from "react";
import { User } from "../context/Context";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";

export default function RequireAuth() {
  const user = useContext(User);
  const location = useLocation();
  const cookie = new Cookies();
  const token = cookie.get("Bearer");
  return token ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} replace to="/login" />
  );
}
