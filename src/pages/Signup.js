import Header from "../components/Header";
import Form from "../components/Form";
import { REGISTERAPIURL } from "../helper/links";
export default function Signup() {
  document.title = "Sign Up";

  return (
    <div>
      <Header />
      <div className="w-5/6 md:w-1/2 absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
        <Form
          btnTitle={"sign Up"}
          name={""}
          email={""}
          APIURL={REGISTERAPIURL}
          isEdit={false}
        />
      </div>
    </div>
  );
}
