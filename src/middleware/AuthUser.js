import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
  // Get the token from the cookies
  const token = req.cookies.access_token;

  // Check if the token is provided
  if (!token) {
    console.error("from autuser : No token provided");
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    // Log decoded token for debugging

    // Attach the decoded data to req.user
    req.user = decoded;

    // Proceed to the next middleware
    next();
  } catch (error) {
    console.error("Auth User Middleware Error:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};
