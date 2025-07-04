import React, { useState, useEffect } from "react";
import { Menu, ChevronLeft, LogOut } from "lucide-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearUser } from "../features/other/authSlice";
import { Navigate } from "react-router-dom";
// import { persistor } from "../config/store";
// import Filter from "./Filter";

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSidebarOpen]);

  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const res = await axios.post("/api/auth/logout");
    dispatch(clearUser());
    // persistor.purge();

    if (res.status === 200) {
      <Navigate to="/" />;
    }
  };

  return (
    <div>
      <div className="w-20 xs:w-10 xm:w-20 fixed h-full top-0 left-0 bg-[var(--sidebar-color)] flex flex-col items-center py-4 gap-6 rounded-r-3xl z-50">
        <div
          className="p-3 text-white hover:bg-white/10 rounded-lg cursor-pointer"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          <Menu size={24} strokeWidth={2} />
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeSidebar}
        ></div>
      )}

      <div
        className={`fixed left-0 top-0 h-full w-80 transform bg-[var(--sidebar-color)] p-6 text-[var(--sidebar-text-color)] transition-transform duration-500 ease-in-out overflow-y-auto z-50 rounded-r-3xl xs:w-screen xm:w-80 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex mb-3 items-center gap-4">
          <button
            className="p-2 rounded hover:bg-white/10 transition"
            onClick={closeSidebar}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h2 className="text-2xl font-semibold">Filter</h2>
        </div>
        {/* <Filter /> */}
        <button
          className="flex items-center justify-start w-[80%] px-4 py-2 text-sm text-red-600 hover:text-red-700 bg-[var(--input-color)] rounded  absolute bottom-10 "
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
