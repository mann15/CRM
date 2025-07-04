export const loggedIn = (req, res, next) => {
  if (req?.session?.user?.userId) {
    return next();
  } else {
    return res.json({
      success: false,
      message: "Access denied: User not logged in.",
    });
  }
};
