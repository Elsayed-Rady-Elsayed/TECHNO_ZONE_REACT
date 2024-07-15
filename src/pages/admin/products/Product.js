import { useContext, useEffect, useState } from "react";
import {
  DELETEPRODUCTAPIURL,
  GETALLPRODUCTSAPIURL,
} from "../../../helper/links";
import Axios from "axios";
import { Link } from "react-router-dom";
import { User } from "../../client/context/Context";
import axios from "axios";
import Cookies from "universal-cookie";
export default function Products() {
  document.title = "products";

  const [products, setProducts] = useState([]);

  const user = useContext(User);

  const token = user.auth.token;

  const cookie = new Cookies();
  const CookieToken = cookie.get("Bearer");

  //this state work when you click delete to refresh the users list and remove deleted one
  const [refreshUsers, setRefUsers] = useState(0);

  useEffect(() => {
    fetch(GETALLPRODUCTSAPIURL, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + CookieToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setProducts(data));
    //add the state variable here to execute the useeffect function again when deleting
  }, [refreshUsers]);

  const DeleteProduct = async (id) => {
    try {
      let response = await Axios.delete(DELETEPRODUCTAPIURL + `/${id}`, {
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
  const ProductShow = products.map((el, idx) => {
    return (
      <tr
        key={idx}
        className={`border hover:bg-gray-200 ${
          (idx + 1) % 2 == 0 ? "bg-blue-200" : "bg-white"
        }`}
      >
        <td className="border p-2">{idx + 1}</td>
        <td className="border p-2">{el.title}</td>
        <td className="border p-2">{el.description}</td>
        <td className="border p-2">
          <img
            src={el.image}
            alt=""
            style={{
              height: "54px",
              width: "100%",
            }}
          />
        </td>
        <td
          className="bg-red-600 cursor-pointer"
          onClick={() => DeleteProduct(el.id)}
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
            <th className="border p-2">title</th>
            <th className="border p-2">description</th>
            <th className="border p-2">image</th>
            <th className="border p-2 md:w-1">REMOVE</th>
            <th className="border p-2 md:w-1">UPDATE</th>
          </tr>
        </thead>
        <tbody>{ProductShow}</tbody>
      </table>
    </div>
  );
}
