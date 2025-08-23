const adminMiddleware = (req, res, next) => {
  
  if (req.user && req.user.admin) {
    next();
  } else {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }
};

export default adminMiddleware;
