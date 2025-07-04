const accessLevels = {
  "r": 1,
  "r-w": 2,
  "r-w-u": 3,
  "r-w-u-d": 4,
};

export const userAccess = (requiredAccess) => {
  return (req, res, next) => {
    const userAccess = req.session?.user?.userAccess;
    
    if (!userAccess) {
      return res
        .status(403)
        .json({ message: "Access denied: User access type not found." });
    }

    const userAccessLevel = accessLevels[userAccess];
    const requiredAccessLevel = accessLevels[requiredAccess];
    
    if (!userAccessLevel) {
      return res
        .status(403)
        .json({ message: "Access denied: Invalid user access type." });
    }

    if (userAccessLevel >= requiredAccessLevel) {
      return next();
    }

    return res
      .status(403)
      .json({ message: "Access denied: Insufficient permissions." });
  };
};