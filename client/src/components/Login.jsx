import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setCity,
  setCountry,
  setState,
} from "../features/location/locationSlice";
import { loadUser, setUser } from "../features/other/authSlice";
import { Lock, User } from "lucide-react";
import {motion} from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        `/api/auth/login`,
        {
          userName,
          userPassword,
        },
        {
          withCredentials: true,
        }
      );

   
      dispatch(
        setUser({
          userName: userName,
          userEmail: response.data.data.userEmail,
          userType: response.data.data.userType,
          userAccess: response.data.data.userAccess,
        })
      );
         dispatch(loadUser());

      const fetchLocation = async () => {
        try {
          const response = await axios.post("/api/other/city/all");
          const response1 = await axios.post("/api/other/state/all");
          const response2 = await axios.post("/api/other/country/all");

          dispatch(setCity(response.data.data));
          dispatch(setState(response1.data.data));
          dispatch(setCountry(response2.data.data));

          console.log(response, response1, response2);
        } catch (error) {
          console.error(error);
        }
      };
      fetchLocation();

      navigate("/home");
    } catch (err) {
      console.log(err);

      setError(err.response?.data?.message || "Login failed");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <img
        src="../assets/background.png"
        alt="CRM Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-4/5 z-[1]">
        <img
          src="../assets/CRM.png"
          alt="CRM Illustration"
          className="w-full h-full object-contain"
        />
      </div>

      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="min-h-screen flex justify-end relative z-10"
      >
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <form
            onSubmit={handleLogin}
            style={{
              background: `linear-gradient(to bottom, 
                #96B3E866 40%,
                #CBD9F340 65%,
                #96B3E81A 90%
              )`,
            }}
            className="w-full max-w-md p-8 backdrop-blur-md rounded-2xl shadow-lg border border-white/60"
          >
            <div className="space-y-6">
              <div className="flex justify-center space-y-2 text-center">
                {/* <h1 className="text-3xl font-bold text-gray-800">Welcome To CRM</h1> */}
                <img
                  src="../assets/userIcon.png"
                  alt=""
                  className="w-16 h-16 object-contain"
                />
              </div>

              {error && (
                <div className="text-red-500 text-center bg-red-100/80 py-2 rounded-lg">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center border border-black/20 bg-white/50 rounded-lg px-4 py-3 backdrop-blur-sm focus-within:border-black">
                  <User className="text-gray-800 mr-5" size={20} />
                  <input
                    id="username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Username"
                    className="w-full bg-transparent focus:outline-none placeholder-inherit"
                    required
                  />
                </div>

                <div className="flex items-center border border-black/20 bg-white/50 rounded-lg px-4 py-3 backdrop-blur-sm focus-within:border-black">
                  <Lock className="text-gray-800 mr-5" size={20} />
                  <input
                    id="password"
                    type="password"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full bg-transparent focus:outline-none placeholder-inherit"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-500/80 hover:bg-blue-600/80 text-white text-2xl font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 backdrop-blur-sm"
                >
                  {isLoading ? "Logging in..." : "LOGIN"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;