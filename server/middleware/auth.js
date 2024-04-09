// import jwt from "jsonwebtoken";

// const auth = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     let decodedData;
//     if (token) {
//       decodedData = jwt.verify(token, process.env.JWT_SECRET);
//       req.userId = decodedData?.id;
//     } else {
//       // Handle cases where the token is not provided or the format is incorrect
//       return res
//         .status(401)
//         .json({ message: "No token provided or token is malformed" });
//     }
//     next();
//   } catch (error) {
//     console.log(error);
//   }
// };

// export default auth;

import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Authorization header is missing" });
    }
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token is not provided" });
    }
    
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedData?.id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "Token is not valid or has expired" });
  }
};

export default auth;
