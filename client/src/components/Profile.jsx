import { User, LogOut, Key } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../features/other/authSlice";
import { Navigate } from "react-router-dom";
// import { persistor } from "../config/store";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { userName, userEmail } = useSelector((state) => state.auth);
  // console.log(userName, userEmail);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
const dispatch = useDispatch();
  const handleLogout = async () => {
    const res = await axios.post("/api/auth/logout");
    dispatch(clearUser());
    // persistor.purge(); 
    if (res.status === 200) {
      <Navigate to="/" />;
    }
  };

  const handleChangePassword = () => {
    // Implement change password logic here
    console.log("Changing password...");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="w-12 h-12 bg-[var(--input-color)] text-black rounded-full flex items-center justify-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <User />
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[var(--input-color)] rounded-md shadow-lg py-1 z-10">
          <div className="px-4 py-2 text-left text-gray-700">
            <p className="font-semibold">{userName || "Guest"}</p>
            <p className="text-xs text-gray-500">{userEmail || "No Email"}</p>
          </div>
          <hr className="my-1" />
          <div className="flex flex-col items-center">
            <button
              className="flex items-center justify-start w-full px-4 py-2 text-sm hover:bg-gray-100"
              onClick={handleChangePassword}
            >
              <Key className="mr-2 h-4 w-4" />
              Change Password
            </button>
            <button
              className="flex items-center justify-start w-full px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
