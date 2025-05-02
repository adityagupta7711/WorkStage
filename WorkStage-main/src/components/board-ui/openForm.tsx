// RightSidebar.tsx
import React from "react";
import useStore from "@/config/useStore";

const RightSidebar: React.FC = () => {
  const { isFormOpen, closeForm } = useStore((state) => ({
    isFormOpen: state.isFormOpen,
    closeForm: state.closeForm,
  }));

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white shadow-lg transform ${
        isFormOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out z-50`}
      style={{ width: "300px" }}
    >
      <div className="p-4">
        <button onClick={closeForm} className="text-red-500">
          Close
        </button>
        <div className="mt-4">Your sidebar content goes here</div>
      </div>
    </div>
  );
};

export default RightSidebar;
