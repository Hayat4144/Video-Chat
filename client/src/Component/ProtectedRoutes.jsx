import { Navigate, Outlet } from "react-router-dom";
import AppContextProvider from "../Context/AppContextProvider";

const ProtectedRoutes = () => {
  const islogdin = JSON.parse(localStorage.getItem("islogdin"));
  console.log(typeof islogdin);
  return islogdin ? (
    <AppContextProvider>
      <Outlet />
    </AppContextProvider>
  ) : (
    <Navigate to="/v5/user/signin" />
  );
};

export default ProtectedRoutes;
