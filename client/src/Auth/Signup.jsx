import React, { Fragment, useState } from "react";
import { BASE_URL, toastifyoption } from "../globalConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [showPassword1, setshowpassword1] = useState(false);
  const [showPassword2, setshowpassword2] = useState(false);
  const navigate = useNavigate();

  const SubmitHandler = async () => {
    let url = `${BASE_URL}/v8/user/sign_up?email=${email}&password=${password}&name=${name}`;
    const signup_response = await fetch(url, {
      method: "GET",
    });
    const { data, error } = await signup_response.json();
    if (signup_response.status !== 200) return console.error(error);
    toast.success(data, toastifyoption);
    navigate("/v5/user/signup");
  };

  return (
    <Fragment>
      <main className="sign_up page">
        <h1 className="text-center font-bold text-3xl my-5 md:my-10">Signup</h1>
        <div
          className="sm:mx-auto sm:w-[50%] mt-4 xl:mx-auto xl:w-[30%]  
                lg:mx-auto lg:w-[25%] signin-form border md:w-[50%] md:m-auto border-gray-300 
                shadow-lg rounded-md  mx-3 mb-2"
        >
          <form
            className="form px-2"
            onSubmit={(e) => {
              e.preventDefault();
              SubmitHandler();
            }}
          >
            <div className="user_name_field my-1">
              <label className="block py-1 text-gray-700">Name</label>
              <input
                value={name}
                onChange={(e) => setname(e.target.value)}
                type="text"
                className="border border-gray-300 focus:border focus:border-blue-600 
                px-4 py-1 outline-none rounded-md w-full"
                placeholder="enter your username"
              />
            </div>

            <div className="user_name_field my-1">
              <label className="block py-1 text-gray-700">Email</label>
              <input
                value={email}
                onChange={(e) => setemail(e.target.value)}
                type="text"
                className="border border-gray-300 focus:border focus:border-blue-600 
                px-4 py-1 outline-none rounded-md w-full"
                placeholder="enter your username"
              />
            </div>
            <div className="password_field my-1">
              <label className="block py-1 text-gray-700">password</label>
              <input
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                type={showPassword1 ? "text" : "password"}
                className="border border-gray-300 rounded-md my-2 py-[8px] 
                w-full focus:border-blue-600 focus:ring-blue-700 bg-inherit 
                focus:border  px-2 outline-none text-sm text-gray-700
                placeholder:text-gray-500"
                placeholder="Enter your password"
              />
              <span
                className="text-sm mr-1 cursor-pointer relative float-right bottom-9 
                right-1"
                onClick={() => setshowpassword1(!showPassword1)}
              >
                {showPassword1 ? " hide" : "show"}
              </span>
            </div>
            <div className="">
              <label htmlFor="Password" className="text-gray-700">
                Re-enter Password
              </label>
              <input
                type={showPassword2 ? "text" : "password"}
                required
                value={confirmpassword}
                onChange={(e) => setconfirmpassword(e.target.value)}
                className="border border-gray-300 rounded-md my-2 py-[8px] 
                w-full focus:border-blue-600 focus:ring-blue-700 bg-inherit 
                focus:border  px-2 outline-none text-sm text-gray-700
                placeholder:text-gray-500 "
                placeholder="Re-enter your password"
              />
              <span
                className="text-sm relative float-right bottom-9 right-1
                cursor-pointer mr-1"
                onClick={() => setshowpassword2(!showPassword2)}
              >
                {showPassword2 ? " hide" : "show"}{" "}
              </span>
            </div>
            <div className="buttons my-3">
              {!isLoading ? (
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-700 w-full
                    text-white rounded-md outline-none focus:border
                    focus:border-blue-700 focus:bg-transparent focus:text-black"
                >
                  Sing up
                </button>
              ) : (
                <button
                  type="button"
                  className="inline-flex 
                 items-center justify-center py-2 mb-5 leading-4 text-sm shadow rounded-md
                 text-white bg-indigo-800 hover:bg-indigo-900
                 w-full text-center transition ease-in-out duration-150 cursor-not-allowed"
                  disabled=""
                >
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="pacity-25 text-white"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 
                      018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 
                      1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing ...
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
    </Fragment>
  );
}

export default Signup;
