import React from "react";
import { useLocation } from "react-router-dom";
import Button from "./Button";
import { SlidersHorizontal, Plus, Search } from "lucide-react";
import Modal from "./CustomModal";
import CollegeForm from "./CollegeForm";
import CompanyForm from "./CompanyForm";
import UniversityForm from "./UniversityForm";
import UserForm from "./UserForm";
import { useSelector } from "react-redux";

const Topbar = ({ isModalOpen, setIsModalOpen, searchTerm, setSearchTerm }) => {
   const userAcess = useSelector((state) => state.auth.userAccess);
  const location = useLocation();

  const renderForm = () => {
    switch (location.pathname) {
      case "/college":
        return <CollegeForm />;
      case "/university":
        return <UniversityForm />;
      case "/industry":
        return <CompanyForm />;
      case "/user":
        return <UserForm />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed top-5 left-[6vw] w-[93vw] p-4">
      <div className="flex justify-between">
        <div className="flex">
          {/* Search Input */}
          <div className="relative flex-auto w-[25vw]">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-[var(--input-color)] border-0 outline-none placeholder-black"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-black p-1 rounded cursor-pointer">
              <Search />
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button text="Filter" logo={SlidersHorizontal} />
          {userAcess > 1 && (
            <Button text="Add" logo={Plus} onClick={() => setIsModalOpen(true)} />
          )}
        </div>
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {renderForm()}
        </Modal>
      )}
    </div>
  );
};

export default Topbar;
