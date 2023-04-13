import jwt from "jsonwebtoken";

async function AuthMiddleware(req, res, next) {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(400).json({ error: "you are unathorized." });

    const jwt_options = {
      expiresIn: "7d",
      algorithm: "HS256",
    };

    const verify_token = jwt.verify(token, process.env.JWT_SECRET, jwt_options);

    if (!verify_token)
      return res.status(403).json({ error: "you are unathorized." });
    req.email = verify_token.email;
    req.user_id = verify_token.id;
    req.name = verify_token.name;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
}

export default AuthMiddleware;
