import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "./Loader";

const CheckAccess = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn === undefined) {
    return <Loader />; 
  }

  return isLoggedIn ? children : <Navigate to="/" />;
};

export default CheckAccess;
