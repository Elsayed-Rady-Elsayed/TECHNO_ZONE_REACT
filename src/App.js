import Header from "./components/Header";
import Login from "./pages/client/auth/Login";
import Signup from "./pages/client/auth/Signup";
import Home from "./pages/client/Home";
import Users from "./pages/admin/user/Users";
import CreateNewUser from "./pages/admin/user/CreateNewUser";
// for router
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import EditUser from "./pages/admin/user/EditUser";
import RequireAuth from "./pages/client/auth/RequireAuth";
import PersistLogin from "./pages/client/auth/PersistLog";
function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="/dashboard/users" element={<Users />} />
              <Route path="users/:id" element={<EditUser />} />
              <Route
                path="/dashboard/users/create"
                element={<CreateNewUser />}
              />{" "}
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
export default App;
