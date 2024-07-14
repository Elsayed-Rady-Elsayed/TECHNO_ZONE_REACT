import { useContext, useEffect, useState } from "react";
import { USERDELETEAPIURL, USERSAPIURL } from "../../../helper/links";
import Axios from "axios";
import { Link } from "react-router-dom";
import { User } from "../../client/context/Context";
import axios from "axios";
import Cookies from "universal-cookie";
export default function Users() {
  document.title = "users";

  const [users, setUsers] = useState([]);

  const user = useContext(User);

  const token = user.auth.token;

  const cookie = new Cookies();
  const CookieToken = cookie.get("Bearer");

  //this state work when you click delete to refresh the users list and remove deleted one
  const [refreshUsers, setRefUsers] = useState(0);

  useEffect(() => {
    fetch(USERSAPIURL, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + CookieToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));
    //add the state variable here to execute the useeffect function again when deleting
  }, [refreshUsers]);

  const DeleteUser = async (id) => {
    try {
      let response = await Axios.delete(USERDELETEAPIURL + `/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + CookieToken,
        },
      });
      if (response.status === 200) {
        //here i update the value of state to execute the useeffct again with the new list
        setRefUsers((v) => v + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const userShow = users.map((el, idx) => {
    return (
      <tr
        key={idx}
        className={`border hover:bg-gray-200 ${
          (idx + 1) % 2 == 0 ? "bg-blue-200" : "bg-white"
        }`}
      >
        <td className="border p-2">{idx + 1}</td>
        <td className="border p-2">{el.name}</td>
        <td className="border p-2">{el.email}</td>
        <td
          className="bg-red-600 cursor-pointer"
          onClick={() => DeleteUser(el.id)}
        >
          <i className="fa-solid fa-trash-can text-white "></i>
        </td>
        <td className="bg-blue-600 cursor-pointer">
          <Link
            to={`${el.id}`}
            className="w-full h-9 flex items-center justify-center p-0 m-0"
          >
            <i className="fa-solid fa-pen-to-square text-white"></i>
          </Link>
        </td>
      </tr>
    );
  });
  return (
    <div className="flex-1  md:p-2">
      <table className="w-full text-center table border border-collapse">
        <thead>
          <tr className="table-row bg-[#4a9dec] text-white border">
            <th className="border p-2">ID</th>
            <th className="border p-2">NAME</th>
            <th className="border p-2">EMAIL</th>
            <th className="border p-2 md:w-1">REMOVE</th>
            <th className="border p-2 md:w-1">UPDATE</th>
          </tr>
        </thead>
        <tbody>{userShow}</tbody>
      </table>
    </div>
  );
}
