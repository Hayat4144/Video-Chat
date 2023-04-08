import { Fragment } from "react";
import Signup from "./Auth/Signup";
import Signin from "./Auth/Signin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Component/Home";
import ProtectedRoutes from "./Component/ProtectedRoutes";

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route element={<Home />} path="/" />
          </Route>
          <Route element={<Signup />} path="/v5/user/signup" />
          <Route element={<Signin />} path="/v5/user/signin" />
        </Routes>
      </Router>
      <ToastContainer />
    </Fragment>
  );
}

export default App;
