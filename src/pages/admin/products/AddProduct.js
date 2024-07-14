import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import { User } from "../../../pages/client/context/Context";
import { useNavigate } from "react-router-dom";
import { ADDNEWPRODUCTAPIURL } from "../../../helper/links";
import Cookies from "universal-cookie";

export default function AddProduct() {
  //STATE FOR USER ENTERED DATA
  const [img, setImg] = useState("");

  const [FormDataa, setFormData] = useState({
    title: "",
    description: "",
  });

  const SavedUser = useContext(User);

  const nav = useNavigate();

  const cookie = new Cookies();

  const CookieToken = cookie.get("Bearer");

  //IF USER CLICKED SIGNUP BUTTON THIS OPEN THE ERRORS
  const [addClick, setAddClick] = useState(false);

  //MAIN FUNCTION THAT HANDLE ALL THE CHANGES HAPPEN TO THE USER STATE
  const handleFieldChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
    console.log(FormData);
  };

  //HANDLE SUBMIT BASED ON PARENT COME FROM
  const onSubmitForm = async function (evt) {
    evt.preventDefault();
    if (
      FormDataa.title.length !== 0 &&
      FormDataa.description.trim().length !== 0 &&
      img
    ) {
      try {
        const formData = new FormData();
        formData.append("title", FormDataa.title);
        formData.append("description", FormDataa.description);
        formData.append("image", img);
        let response = await Axios.post(ADDNEWPRODUCTAPIURL, formData, {
          headers: {
            Authorization: "Bearer " + CookieToken,
          },
        });
        // if (response.status === 200) {
        //   if (props.isEdit) {
        //     nav("/dashboard/users");
        //   } else {
        //     const token = response.data.data.token;
        //     const userDetails = response.data.data.user;
        //     const cookie = new Cookies();
        //     cookie.set("Bearer", token);
        //     SavedUser.setAuth({ token, userDetails });
        //     nav("/");
        //   }
        // }
        // if (!props.isEdit) {
        //   setEmailExist(false);
        // }
      } catch (error) {
        // if (!props.isEdit) {
        //   setEmailExist(true);
        // }
        console.log(error);
      }
    }
  };
  return (
    <form
      onSubmit={onSubmitForm}
      action=""
      className={`flex-1 p-2 flex flex-col p-0 rounded-2xl gap-5`}
    >
      <h2 className="text-3xl uppercase font-bold text-center text-[#4a9dec]">
        add product
      </h2>
      <div>
        <label
          htmlFor="title"
          className="capitalize inline-block mb-2 text-slate-500"
        >
          title
        </label>
        <input
          type="text"
          className="border-2 border-solid border-transparent outline-none bg-[#f3f3f3] w-full h-12 rounded-[10px] transition-all p-2 hover:border-[#4a9dec] hover:shadow-lg hover:shadow-sky-300"
          id="title"
          placeholder="title"
          name="title"
          value={FormDataa.title}
          onChange={handleFieldChange}
        />
        {FormDataa.title.length === 0 && addClick ? (
          <p className="ps-2 text-red-600 text-sm">
            <i className="fa-solid fa-circle-exclamation fa-md mt-2"></i> name
            must not be empty
          </p>
        ) : (
          ""
        )}
      </div>
      <div>
        <label
          htmlFor="Description"
          className="capitalize inline-block mb-2 text-slate-500"
        >
          Description
        </label>
        <input
          type="text"
          className="border-2 border-solid border-transparent outline-none bg-[#f3f3f3] w-full h-12 rounded-[10px] transition-all p-2 hover:border-[#4a9dec] hover:shadow-lg hover:shadow-sky-300"
          id="Description"
          name="description"
          placeholder="Description"
          value={FormDataa.description}
          onChange={handleFieldChange}
        />
        {FormDataa.description.length === 0 && addClick ? (
          <p className="ps-2 text-red-600 text-sm">
            <i className="fa-solid fa-circle-exclamation fa-md mt-2 me-1"></i>
            Description must not be empty
          </p>
        ) : (
          ""
        )}
      </div>
      <div>
        <label
          htmlFor="image"
          className="capitalize inline-block mb-2 text-slate-500"
        >
          image
        </label>
        <input
          type="file"
          className="border-2 border-solid border-transparent outline-none bg-[#f3f3f3] w-full h-12 rounded-[10px] transition-all p-2 hover:border-[#4a9dec] hover:shadow-lg hover:shadow-sky-300"
          id="image"
          name="image"
          placeholder="image"
          onChange={(e) => setImg(e.target.files.item(0))}
        />
        {!img && addClick ? (
          <p className="ps-2 text-red-600 text-sm">
            <i className="fa-solid fa-circle-exclamation fa-md mt-2 me-1"></i>{" "}
            please choose an image
          </p>
        ) : (
          ""
        )}
      </div>
      <button
        onClick={() => {
          setAddClick(true);
        }}
        type="submit"
        className={`bg-gradient-to-tr opacity-100 from-[#4a9dec] to-[#c2e9fb] text-white p-2 rounded-full w-1/4 hover:opacity-75 transition-all`}
      >
        Add
      </button>
    </form>
  );
}
