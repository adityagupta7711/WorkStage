"use client";
import React from "react";
import { MdOutlineAddCircle } from "react-icons/md";
import useStore from "@/config/useStore";

interface BtnProps {
  w: string;
  h: string;
}

const CreateNewBtn = ({ w, h }: BtnProps) => {
  const toggleForm = useStore((state: any) => state.toggleForm);
  const storeState = useStore((state: any) => state);

  const handleClick = () => {
    toggleForm();
    console.log("Store state on click:", storeState.isFormOpen);
  };

  return (
    <div
      onClick={handleClick}
      className={`w-[${w}] cursor-pointer text-white rounded-[8px] h-[${h}] flex justify-center gap-2 items-center authFinalBtn bg-blue-500`}
    >
      Create new
      <MdOutlineAddCircle size={24} />
    </div>
  );
};

export default CreateNewBtn;
