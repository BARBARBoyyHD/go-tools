import jwt from "jsonwebtoken";

export const validateRole = (roles) => {
  return (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
      console.error("from auth role : No token provided");
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      // Verify and decode the token
      const decoded = jwt.verify(token, process.env.JWT_KEY);

      // Log decoded token for debugging

      // Attach the decoded data to req.user
      req.user = decoded;

      // Check if the user's role is included in the allowed roles
      if (roles.includes(req.user.role)) {
        // Proceed to the next middleware
        return next();
      } else {
        console.error("Insufficient permissions");
        return res.status(403).json({ message: "Forbidden" });
      }
    } catch (error) {
      console.error("Auth Middleware Error:", error.message);
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};
