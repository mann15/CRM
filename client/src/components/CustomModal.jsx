import React from "react";

const CustomModal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null; // Prevent rendering if modal is not open

  return (
    <div className=" fixed inset-0 flex items-center justify-center z-[100] bg-opacity-40 bg-black">
      <div className="bg-white w-[700px] max-h-[600px] p-6 rounded-lg shadow-lg relative flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>

        {/* Title */}
        {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}

        {/* Scrollable Content */}
        <div className="flex-grow overflow-y-auto pr-3">
          {React.cloneElement(children, { onClose: onClose })}
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
