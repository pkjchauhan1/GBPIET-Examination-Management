import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decodedData;
    if (token) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decodedData?.id;
    } else {
      // Handle cases where the token is not provided or the format is incorrect
      return res
        .status(401)
        .json({ message: "No token provided or token is malformed" });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
