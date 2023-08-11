import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ type }) => {
  const authorized =
    JSON.parse(localStorage.getItem("is_loged")) === "true" ? true : false;
  const logedUserType = parseInt(JSON.parse(localStorage.getItem("user_type")));
  console.log(logedUserType);
  const logedUserHome = JSON.parse(localStorage.getItem("home_page"));

  if (!authorized) {
    return <Navigate to="Login" />;
  } else {
    if (type === logedUserType) {
      console.log("33");
      return <Outlet />;
    } else {
      console.log("22");
      return <Navigate to={logedUserHome} />;
    }
  }
};

export default ProtectedRoutes;
