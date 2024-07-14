import { Outlet } from "react-router-dom";
import Axios from "axios";
import { User } from "../../client/context/Context";
import Cookies from "universal-cookie";

import { useContext, useEffect, useState } from "react";
import LoadingPage from "../../../components/Loading";
export default function PersistLogin() {
  const user = useContext(User);
  const token = user.auth.token;
  const cookie = new Cookies();
  const getToken = cookie.get("Bearer");
  const [load, setload] = useState(true);
  useEffect(() => {
    async function refreshToken() {
      try {
        await Axios.post("http://127.0.0.1:8000/api/refresh", null, {
          headers: {
            Authorization: "Bearer " + getToken,
          },
        }).then((data) => {
          cookie.set("Bearer", data.data.token);
          user.setAuth((prev) => {
            return {
              userDetails: data.data.user,
              token: data.data.token,
            };
          });
        });
      } catch (e) {
        console.log(e);
      } finally {
        setload(false);
      }
    }
    !getToken ? refreshToken() : setload(false);
  }, []);
  return load ? <LoadingPage /> : <Outlet />;
}
