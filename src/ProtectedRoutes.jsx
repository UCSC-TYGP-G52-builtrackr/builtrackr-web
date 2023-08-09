import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ type }) => {
  const authorized = true;
  // const logedUserType = parseInt(JSON.parse(localStorage.getItem("user_type")));
  const logedUserType = 4;
  const logedUserHome = JSON.parse(localStorage.getItem("home_page"));

  if (!authorized) {
    return <Navigate to="Login" />;
  } else {
    if (type === logedUserType) {
      return <Outlet />;
    } else {
      return <Navigate to={logedUserHome} />;
    }
  }
};

export default ProtectedRoutes;
