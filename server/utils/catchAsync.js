export const catchAsync = (fn) => {
  return (req, res, next) => {
    // try {
    //   fn(req, res, next);
    // } catch (err) {
    //   next(err);
    // }
    fn(req, res, next).catch((err) => {
      next(err);
    });
  };
};
