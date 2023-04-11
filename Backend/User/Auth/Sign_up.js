import bcrypt from "bcrypt";
import UserModel from "../Model/UserModel.js";

async function Signup(req, res) {
  try {
    const { email, password } = req.query;
    if (!email && !password)
      return res
        .status(400)
        .json({ error: "email and password can not be empty." });
    const saltRound = 10;
    const hashpassword = await bcrypt.hash(password, saltRound);
    const _newuser = new UserModel({
      email,
      password: hashpassword,
    });
    await _newuser
      .save()
      .then((data) => {
        console.log(data);
        return res
          .status(200)
          .json({ data: "User has been created successfully" });
      })
      .catch((error) => {
        if (error) return res.status(400).json({ error: error });
      });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error });
  }
}

export default Signup;
