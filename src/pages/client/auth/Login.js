import Axios from "axios";
import { useState, useContext } from "react";
import { LOGINAPIURL } from "../../../helper/links";
import Header from "../../../components/Header";
import { User } from "../context/Context";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Alert from "../../../components/Alert";
export default function Login() {
  document.title = "Login";
  //STATE FOR USER ENTERED DATA
  const [FormData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [wrong, setWrong] = useState();

  const SavedUser = useContext(User);

  const nav = useNavigate();

  //IF USER CLICKED SIGNUP BUTTON THIS OPEN THE ERRORS
  const [LoginButtonClicked, setLoginClicked] = useState(false);

  //FUNCTION TO BE PASSED TO THE FORM onSubmit
  const onSubmitForm = async function (evt) {
    evt.preventDefault();
    if (
      FormData.email.trim().length !== 0 &&
      FormData.password.trim().length !== 0
    ) {
      try {
        let response = await Axios.post(LOGINAPIURL, FormData);

        if (response.status === 200) {
          const token = response.data.data.token;
          const userDetails = response.data.data.user;
          SavedUser.setAuth({ token, userDetails });
          const cookie = new Cookies();
          cookie.set("Bearer", token);
          document.getElementById("loginedSuccess").classList.remove("hidden");
          setWrong(false);
          setTimeout(() => {
            nav("/");
          }, 1000);
        }
      } catch (error) {
        setWrong(true);
        document.getElementById("loginedSuccess").classList.remove("hidden");
        console.log(error);
      }
    }
  };

  //MAIN FUNCTION THAT HANDLE ALL THE CHANGES HAPPEN TO THE USER STATE
  const handleFieldChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  return (
    <div>
      <Header />
      <div id="loginedSuccess" className="hidden">
        <Alert
          title={wrong ? "email or password is wrong" : "logined successfully"}
          color={wrong ? "bg-red-400" : "bg-green-400"}
        />
      </div>

      <div className="w-5/6 md:w-1/2 absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
        <form
          onSubmit={onSubmitForm}
          action=""
          className="flex flex-col shadow-2xl p-10 rounded-2xl gap-5 bg-[#e8e8e8]"
        >
          <h2 className="text-3xl uppercase font-bold text-center text-[#4a9dec]">
            Login
          </h2>
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
            {FormData.email.length === 0 && LoginButtonClicked ? (
              <p className="ps-2 text-red-600 text-sm">
                <i className="fa-solid fa-circle-exclamation fa-md mt-2 me-1"></i>
                please enter your email
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
            {FormData.password.length === 0 && LoginButtonClicked ? (
              <p className="ps-2 text-red-600 text-sm">
                <i className="fa-solid fa-circle-exclamation fa-md mt-2 me-1"></i>{" "}
                please enter your password
              </p>
            ) : (
              ""
            )}
          </div>
          <button
            onClick={() => {
              setLoginClicked(true);
            }}
            type="submit"
            className="bg-gradient-to-tr opacity-100 from-[#4a9dec] to-[#c2e9fb] text-white p-2 rounded-full w-1/2 m-auto hover:opacity-75 transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
