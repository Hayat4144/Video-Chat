import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { toastifyoption } from "../globalConfig";

function Decode_token(token) {
  let decode_token = jwt_decode(token);
  if (!decode_token) return toast.error("invalid token", toastifyoption);
  console.log(decode_token);
  // decode_token = JSON.stringify(decode_token);
  // localStorage.setItem("user", decode_token);
  return decode_token;
}

export default Decode_token;
