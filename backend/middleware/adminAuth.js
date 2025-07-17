import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  console.log("🔍 Admin Auth middleware triggered"); // Add this line
  
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      console.log("❌ No Bearer token found"); // Add this line
      return res
        .status(401)
        .json({ success: false, message: "Not authorized. Token missing." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (
      decoded.email !== process.env.ADMIN_EMAIL ||
      decoded.password !== process.env.ADMIN_PASSWORD
    ) {
      console.log("❌ Admin check failed"); // Add this line
      return res
        .status(403)
        .json({ success: false, message: "Forbidden: Admins only." });
    }

    console.log("✅ Admin auth successful"); // Add this line
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Auth error:", error);
    res
      .status(401)
      .json({ success: false, message: "Invalid token", error: error.message });
  }
};

export default adminAuth;