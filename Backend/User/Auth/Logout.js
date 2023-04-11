async function Logout(req, res) {
  try {
    res.clearCookie("token");
    return res.status(200).json({ data: "Logout successfully." });
  } catch (error) {
    console.error(error.message);
  }
}

export default Logout;
