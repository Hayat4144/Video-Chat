import { Fragment, Suspense, lazy, useEffect } from "react";
import Signup from "./Auth/Signup";
import Signin from "./Auth/Signin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import Home from "./Component/Home";
import ProtectedRoutes from "./Component/ProtectedRoutes";
import VideoCom from "./Component/VideoCom";
import CallContextProvider from "./Context/CallContext";
import IncomingCall from "./Component/IncomingCall";
const Chat = lazy(() => import("./Component/Chat"));

function App() {
  function getCookie(name) {
    const cookieString = document.cookie;
    const cookies = cookieString.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + "=")) {
        return true;
      }
    }

    return null;
  }

  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      localStorage.setItem("islogdin", false);
    }
  }, []);

  return (
    <Fragment>
      <CallContextProvider>
        <Router>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route element={<Home />} path="/" />
              <Route
                element={
                  <Suspense fallback={"loading..."}>
                    <Chat />
                  </Suspense>
                }
                path="/v5/user/chat/:id"
              />
            </Route>
            <Route element={<Signup />} path="/v5/user/signup" />
            <Route element={<Signin />} path="/v5/user/signin" />
          </Routes>
        </Router>
        <IncomingCall />
      
      </CallContextProvider>
      <ToastContainer />
    </Fragment>
  );
}

export default App;
