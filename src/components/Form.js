import Axios from "axios";
import { useEffect, useState } from "react";
import { REGISTERAPIURL } from "../helper/links";
export default function Form(props) {
  //STATE FOR USER ENTERED DATA
  const [FormData, setFormData] = useState({
    name: props.name,
    email: props.email,
    password: "",
    password_confirmation: "",
  });

  //THIS USE EFFECT USED TO SET DATA IN FIELDS WHEN I COME TO EDIT USER
  useEffect(() => {
    setFormData({
      name: props.name,
      email: props.email,
      password: FormData.password,
      password_confirmation: FormData.password_confirmation,
    });
  }, [props.name, props.email]);

  //IF USER CLICKED SIGNUP BUTTON THIS OPEN THE ERRORS
  const [RegisterClicked, setRgisterClicked] = useState(false);

  //IF THE USER ENTERD EXIST EMAIL
  const [emailExist, setEmailExist] = useState(false);

  //MAIN FUNCTION THAT HANDLE ALL THE CHANGES HAPPEN TO THE USER STATE
  const handleFieldChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  //HANDLE SUBMIT BASED ON PARENT COME FROM
  const onSubmitForm = async function (evt) {
    evt.preventDefault();
    if (
      FormData.name.length !== 0 &&
      FormData.email.trim().length !== 0 &&
      FormData.password.trim().length !== 0 &&
      FormData.password_confirmation.trim() === FormData.password.trim()
    ) {
      try {
        let response = await Axios.post(props.APIURL, FormData);
        if (response.status === 200) {
          if (props.isEdit) {
            window.location.pathname = "/dashboard/users";
          } else {
            window.localStorage.setItem(
              "user",
              JSON.stringify(response.data.data.user)
            );
            window.location.pathname = "/";
          }
        }
        if (!props.isEdit) {
          setEmailExist(false);
        }
      } catch (error) {
        if (!props.isEdit) {
          setEmailExist(true);
        }
        console.log(error);
      }
    }
  };
  return (
    <form
      onSubmit={onSubmitForm}
      action=""
      className="w-full mt-16 flex flex-col shadow-2xl p-5 md:p-10 rounded-2xl gap-5 bg-[#e8e8e8]"
    >
      <h2 className="text-3xl uppercase font-bold text-center text-[#4a9dec]">
        {props.btnTitle}
      </h2>
      <div>
        <label
          htmlFor="name"
          className="capitalize inline-block mb-2 text-slate-500"
        >
          name
        </label>
        <input
          type="text"
          className="border-2 border-solid border-transparent outline-none bg-[#f3f3f3] w-full h-12 rounded-[10px] transition-all p-2 hover:border-[#4a9dec] hover:shadow-lg hover:shadow-sky-300"
          id="name"
          placeholder="name"
          name="name"
          value={FormData.name}
          onChange={handleFieldChange}
        />
        {FormData.name.length === 0 && RegisterClicked ? (
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
          htmlFor="email"
          className="capitalize inline-block mb-2 text-slate-500"
        >
          email
        </label>
        <input
          type="email"
          className="border-2 border-solid border-transparent outline-none bg-[#f3f3f3] w-full h-12 rounded-[10px] transition-all p-2 hover:border-[#4a9dec] hover:shadow-lg hover:shadow-sky-300"
          id="email"
          name="email"
          placeholder="email"
          value={FormData.email}
          onChange={handleFieldChange}
        />
        {FormData.email.length === 0 && RegisterClicked ? (
          <p className="ps-2 text-red-600 text-sm">
            <i className="fa-solid fa-circle-exclamation fa-md mt-2 me-1"></i>
            email must not be empty
          </p>
        ) : (
          ""
        )}
        {emailExist ? (
          <p className="ps-2 text-red-600 text-sm">
            <i className="fa-solid fa-circle-exclamation fa-md mt-2 me-1"></i>{" "}
            this email already exist
          </p>
        ) : (
          ""
        )}
        {!FormData.email.endsWith("@gmail.com") &&
        FormData.email.length !== 0 &&
        RegisterClicked ? (
          <p className="ps-2 text-red-600 text-sm">
            email must end with @gmail.com
          </p>
        ) : (
          ""
        )}
      </div>
      <div>
        <label
          htmlFor="password"
          className="capitalize inline-block mb-2 text-slate-500"
        >
          password
        </label>
        <input
          type="password"
          className="border-2 border-solid border-transparent outline-none bg-[#f3f3f3] w-full h-12 rounded-[10px] transition-all p-2 hover:border-[#4a9dec] hover:shadow-lg hover:shadow-sky-300"
          id="password"
          name="password"
          placeholder="password"
          value={FormData.password}
          onChange={handleFieldChange}
        />
        {FormData.password.length < 9 && RegisterClicked ? (
          <p className="ps-2 text-red-600 text-sm">
            <i className="fa-solid fa-circle-exclamation fa-md mt-2 me-1"></i>{" "}
            password must be more than 8 charachters
          </p>
        ) : (
          ""
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="confPass"
          className="capitalize inline-block mb-2 text-slate-500"
        >
          confirm password
        </label>
        <input
          type="password"
          className="border-2 border-solid border-transparent outline-none bg-[#f3f3f3] w-full h-12 rounded-[10px] transition-all p-2 hover:border-[#4a9dec] hover:shadow-lg hover:shadow-sky-300"
          id="confPass"
          name="password_confirmation"
          placeholder="confirm password"
          value={FormData.password_confirmation}
          onChange={handleFieldChange}
        />
        {FormData.password_confirmation !== FormData.password &&
        RegisterClicked ? (
          <p className="ps-2 text-red-600 text-sm">
            <i className="fa-solid fa-circle-exclamation fa-md mt-2 me-1"></i>{" "}
            two password are not matched
          </p>
        ) : (
          ""
        )}
      </div>
      <button
        onClick={() => {
          setRgisterClicked(true);
        }}
        type="submit"
        className="bg-gradient-to-tr opacity-100 from-[#4a9dec] to-[#c2e9fb] text-white p-2 rounded-full w-1/2 m-auto hover:opacity-75 transition-all"
      >
        {props.btnTitle}
      </button>
    </form>
  );
}
