import { useEffect, useState } from "react";
import "../helper/links";
import { GETONEUSERAPIURL, UPDATEUSERAPIURL } from "../helper/links";
import Form from "../components/Form";
export default function EditUser() {
  document.title = "EDIT USER";

  const [userToEditInfo, setUserInfo] = useState({
    name: "",
    email: "",
  });

  //GET SEND ID FROM URL
  const id = Number(window.location.pathname.split("/").slice(-1).join());

  //GET SPECIFIC USER DATA
  useEffect(() => {
    fetch(GETONEUSERAPIURL + `/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUserInfo({
          name: data[0].name,
          email: data[0].email,
        });
      });
  }, []);

  return (
    <div className="p-3 w-full">
      <h1 className="font-medium text-2xl mb-4">Edit User Data</h1>
      <Form
        btnTitle={"edit"}
        name={userToEditInfo.name}
        email={userToEditInfo.email}
        APIURL={UPDATEUSERAPIURL + `/${id}`}
        isEdit={true}
      />
    </div>
  );
}
