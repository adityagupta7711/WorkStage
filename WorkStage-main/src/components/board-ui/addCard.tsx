import axios from "axios";
import { motion } from "framer-motion";
import { useState, FormEvent } from "react";
import toast from "react-hot-toast";
import { BsPencil } from "react-icons/bs";
import { CiShare2, CiCalendar } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";
import { FiLoader, FiAlertTriangle, FiPlus } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { IoResizeOutline } from "react-icons/io5";
import useStore from "../../config/useStore";

type AddCardProps = {
  column: ColumnType;
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>;
};

export const AddCard = ({ column, setCards }: AddCardProps) => {
  const { isFormOpen } = useStore();
  const toggleForm = useStore((state: any) => state.toggleForm);

  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("Low");
  const [deadline, setDeadline] = useState("");
  const [columnName, setColumnName] = useState<ColumnType>("To-Do");

  const handleClick = () => {
    toggleForm();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim().length) return;

    const newCard: CardType = {
      column: columnName,
      title: text.trim(),
      description: description.trim(),
      priority,
      deadline,
      id: Math.random().toString(),
    };
    console.log(newCard);

    setCards((prev) => [...prev, newCard]);

    // Reset state and close form
    setText("");
    setDescription("");
    setColumnName("To-Do");
    setPriority("Low");
    setDeadline("");
    handleClick();
  };

  return (
    <div className="relative">
      {isFormOpen && (
        <motion.form
          layout
          onSubmit={handleSubmit}
          className="fixed top-0  px-5 right-0 w-1/2 h-full p-4 bg-[#DEDEDE] rounded-l shadow-lg z-50"
          initial={{ x: 300, opacity: 0 }} // Initial position off-screen
          animate={{ x: 0, opacity: 1 }} // Slide in
          exit={{ x: 300, opacity: 0 }} // Slide out
          transition={{ type: "linear", stiffness: 300 }}
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={handleClick} // Show form on click
                  className="mr-2 px-3 py-1 text-xs  text-[#797979] transition-colors hover:text-neutral-900"
                >
                  <IoMdClose size={24} />
                </button>
                <IoResizeOutline size={22} color="#797979" />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center gap-2 text-[#797979] bg-[#F4F4F4] py-2 px-4 rounded-[8px]">
                  <p>Share</p>
                  <CiShare2 size={20} />
                </div>
                <div className="flex items-center justify-center gap-2 text-[#797979] bg-[#F4F4F4] py-2 px-4 rounded-[8px]">
                  <p>Favorite</p>
                  <FaRegStar size={20} />
                </div>
              </div>
            </div>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              autoFocus
              placeholder="Title"
              className="w-full rounded border text-[46px] text-[#444] font-semibold bg-transparent mb-2 outline-none border-none  py-2"
            />

            <div className="flex gap-16 items-center">
              <div className="flex items-center gap-4">
                <FiLoader />
                <p>Status</p>
              </div>
              <select
                value={columnName}
                onChange={(e) => setColumnName(e.target.value as ColumnType)}
                className="w-full rounded hover:bg-gray-200 cursor-pointer bg-transparent p-3 text-sm text-neutral-900 placeholder-violet-300 focus:outline-0 mb-2"
              >
                <option value="To-Do">To-Do</option>
                <option value="In Progress">In progress</option>
                <option value="Under Review">Under review</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="flex gap-16 items-center mb-2">
              <div className="flex items-center gap-4">
                <FiAlertTriangle />
                <p>Priority</p>
              </div>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="w-full rounded hover:bg-gray-200 cursor-pointer bg-transparent p-3 text-sm text-neutral-900 placeholder-violet-300 focus:outline-0 mb-2"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            <div className="flex gap-16 items-center mb-5">
              <div className="flex items-center gap-4">
                <CiCalendar />
                <p>Deadline</p>
              </div>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full rounded focus:outline-0 bg-transparent"
              />
            </div>
            <div className="flex gap-12 items-center mb-4">
              <div className="flex items-center gap-4">
                <BsPencil />
                <p>Description</p>
              </div>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="w-full rounded focus:outline-0 bg-transparent"
              />
            </div>
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                className="flex w-full justify-center py-2.5 items-center gap-1 rounded bg-neutral-50 px-3  mt-4 text-neutral-950 transition-colors hover:bg-neutral-300"
              >
                <span>Add</span>
                <FiPlus />
              </button>
            </div>
          </div>
        </motion.form>
      )}
      <motion.button
        layout
        onClick={handleClick} // Show form on click
        className="flex z-10 items-center justify-between mt-1 h-[40px] w-[256px] rounded-[8px] gap-1.5 px-3 py-1.5 text-[#E3E1E1] transition-colors hover:text-neutral-50 addCardBtnBg"
      >
        <span>Add card</span>
        <FiPlus />
      </motion.button>
    </div>
  );
};

type ColumnType = "To-Do" | "In Progress" | "Under Review" | "Completed";

type Priority = "Low" | "Medium" | "Urgent";

type CardType = {
  title: string;
  description: string;
  priority: Priority;
  deadline: string;
  id: string;
  column: string;
};
