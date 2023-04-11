import UserModal from "../Model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function Sign_in(req, res) {
  try {
    const { email, password } = req.query;

    if (!email || !password)
      return res
        .status(400)
        .json({ error: "username and password can not be empty." });

    const isUserExist = await UserModal.findOne({ email });

    if (!isUserExist)
      return res.status(400).json({ error: "User can not exist." });

    const comparepassword = await bcrypt.compare(
      password,
      isUserExist.password
    );
    if (!comparepassword)
      return res.status(400).json({ error: "Invalid username/password." });

    const jwt_options = {
      expiresIn: "7d",
      algorithm: "HS256",
    };

    const jwt_data = {
      id: isUserExist._id,
      email: isUserExist.email,
    };

    const jwt_token = jwt.sign(jwt_data, process.env.JWT_SECRET, jwt_options);
    if (!jwt_token) return res.status(400).json({ error: jwt_token });
    res.cookie("token", jwt_token, {
      maxAge: 2 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
    });
    return res
      .status(200)
      .json({ data: "Login Successfull.", token: jwt_token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
}

export default Sign_in;
