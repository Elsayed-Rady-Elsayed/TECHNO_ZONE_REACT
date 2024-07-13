import Form from "../../../components/Form";
import { ADDNEWUSERAPIURL } from "../../../helper/links";
export default function CreateNewUser() {
  return (
    <div className="flex-1  md:p-2">
      <Form
        btnTitle={"add new user"}
        name={""}
        email={""}
        APIURL={ADDNEWUSERAPIURL}
        isEdit={true}
      />
    </div>
  );
}
