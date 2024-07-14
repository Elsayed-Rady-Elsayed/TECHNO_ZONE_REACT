import Header from "../../components/Header";
import { useContext } from "react";
import { User } from "./context/Context";
export default function Home() {
  document.title = "Home";
  const u = useContext(User);
  console.log(u);
  return (
    <div>
      <Header />
      <h2>home</h2>
    </div>
  );
}
