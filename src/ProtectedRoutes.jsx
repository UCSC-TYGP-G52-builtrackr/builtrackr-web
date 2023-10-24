import { Navigate, Outlet } from "react-router-dom";
import { decryptData } from "./encrypt";

const ProtectedRoutes = ({ type }) => {
  const authorized = JSON.parse(localStorage.getItem("is_loged"))
    ? decryptData(JSON.parse(localStorage.getItem("is_loged")))
    : "";
  const logedUserType = JSON.parse(localStorage.getItem("user_type"))
    ? parseInt(decryptData(JSON.parse(localStorage.getItem("user_type"))))
    : "";
  const logedUserHome = JSON.parse(localStorage.getItem("home_page"))
    ? decryptData(JSON.parse(localStorage.getItem("home_page")))
    : "";

  if (authorized !== "yes") {
    return <Navigate to="Login" />;
  } else {
    if (type === logedUserType) {
      return <Outlet />;
    } else {
      console.log("22");
      return <Navigate to={logedUserHome} />;
    }
  }
};

export default ProtectedRoutes;
