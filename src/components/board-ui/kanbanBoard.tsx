"use client";
import React, {
  Dispatch,
  SetStateAction,
  useState,
  DragEvent,
  FormEvent,
} from "react";
import { FiTrash, FiEdit } from "react-icons/fi";
import { motion } from "framer-motion";
import { CiCalendar, CiFilter, CiSearch, CiShare2 } from "react-icons/ci";
import { BsStars } from "react-icons/bs";
import CreateNewBtn from "./createNewBtn";
import { CgMenuLeft } from "react-icons/cg";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { AddCard } from "./addCard";

export const CustomKanban = () => {
  return (
    <div className="h-screen w-full bg-white">
      <Toaster position="bottom-right" />
      <Board />
    </div>
  );
};

const Board = () => {
  const [cards, setCards] = useState(DEFAULT_CARDS);

  const paramValue = usePathname();

  return (
    <div
      className={`w-full ${
        paramValue === "/Board" ? "mt-0" : "mt-48"
      }  bg-white`}
    >
      <div className="flex items-center justify-between px-4 py-2 bg-[#DEDEDE]">
        <div className="flex gap-2 bg-white mt-2 w-[196px] h-[40px] justify-between px-3 items-center rounded-[8px]">
          <input
            type="text"
            placeholder="Search"
            className="bg-white w-[120px] outline-none border-none text-[#797979] "
          />
          <CiSearch color="#797979" size={24} />
        </div>
        <div className="flex gap-4">
          <div className="flex gap-1 items-center cursor-pointer">
            <p className="text-[#797979]">Calendar view</p>
            <CiCalendar size={20} color="#797979" />
          </div>
          <div className="flex gap-1 items-center cursor-pointer">
            <p className="text-[#797979]">Automation</p>
            <BsStars size={20} color="#797979" />
          </div>
          <div className="flex gap-1 items-center cursor-pointer">
            <p className="text-[#797979]">Filter</p>
            <CiFilter size={20} color="#797979" />
          </div>
          <div className="flex gap-1 items-center cursor-pointer">
            <p className="text-[#797979]">Share</p>
            <CiShare2 size={20} color="#797979" />
          </div>
          <CreateNewBtn w="196px" h="40px" />
        </div>
      </div>
      <div className="flex gap-14 w-full px-4 py-2  boardbg   overflow-x-auto">
        <Column
          title="To Do"
          column="To-Do"
          headingColor="text-[#555555] text-[20px]"
          cards={cards}
          setCards={setCards}
        />
        <Column
          title="In Progress"
          column="In Progress"
          headingColor="text-[#555555] text-[20px]"
          cards={cards}
          setCards={setCards}
        />
        <Column
          title="Under Review"
          column="Under Review"
          headingColor="text-[#555555] text-[20px]"
          cards={cards}
          setCards={setCards}
        />
        <Column
          title="Finished"
          column="Completed"
          headingColor="text-[#555555] text-[20px]"
          cards={cards}
          setCards={setCards}
        />
      </div>
    </div>
  );
};

type ColumnProps = {
  title: string;
  headingColor: string;
  cards: CardType[];
  column: ColumnType;
  setCards: Dispatch<SetStateAction<CardType[]>>;
};

const Column = ({
  title,
  headingColor,
  cards,
  column,
  setCards,
}: ColumnProps) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e: DragEvent, card: CardType) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragEnd = (e: DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId");

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const getNearestIndicator = (e: DragEvent, indicators: HTMLElement[]) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(
        `[data-column="${column}"]`
      ) as unknown as HTMLElement[]
    );
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredCards = cards.filter((c) => c.column === column);

  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400 flex items-center gap-2">
          {filteredCards.length}
          <CgMenuLeft size={20} color="#555555" className="cursor-pointer" />
        </span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${
          active ? "bg-transparent" : "bg-transparent"
        }`}
      >
        {filteredCards.map((c) => {
          return (
            <Card
              key={c.id}
              {...c}
              handleDragStart={handleDragStart}
              setCards={setCards}
            />
          );
        })}
        <DropIndicator beforeId={null} column={column} />
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
};

type CardProps = CardType & {
  handleDragStart: Function;
  setCards: Dispatch<SetStateAction<CardType[]>>;
};

const Card = ({
  title,
  description,
  priority,
  deadline,
  id,
  column,
  handleDragStart,
  setCards,
}: CardProps) => {
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedPriority, setEditedPriority] = useState(priority);
  const [editedDeadline, setEditedDeadline] = useState(deadline);

  const handleEditSubmit = (e: FormEvent) => {
    e.preventDefault();
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id
          ? {
              ...card,
              title: editedTitle,
              description: editedDescription,
              priority: editedPriority,
              deadline: editedDeadline,
            }
          : card
      )
    );
    setEditing(false);
  };

  const handleDelete = () => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      {editing ? (
        <motion.form
          layout
          onSubmit={handleEditSubmit}
          className="cursor-grab rounded border border-neutral-700 bg-[#DEDEDE] p-6 active:cursor-grabbing"
        >
          <textarea
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Title"
            className="w-full bg-neutral-700 text-sm text-neutral-100 mb-2 p-2"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Description"
            className="w-full bg-neutral-700 text-sm text-neutral-100 mb-2 p-2"
          />
          <select
            value={editedPriority}
            onChange={(e) => setEditedPriority(e.target.value as Priority)}
            className="w-full bg-neutral-700 text-sm text-neutral-100 mb-2 p-2"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="Urgent">Urgent</option>
          </select>
          <input
            type="date"
            value={editedDeadline}
            onChange={(e) => setEditedDeadline(e.target.value)}
            className="w-full bg-neutral-700 text-sm text-neutral-100 mb-2 p-2"
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-emerald-500 px-3 py-1 rounded text-sm"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="bg-red-500 px-3 py-1 rounded text-sm"
            >
              Cancel
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.div
          layout
          layoutId={id}
          draggable="true"
          onDragStart={(e) =>
            handleDragStart(e, {
              title,
              description,
              priority,
              deadline,
              id,
              column,
            })
          }
          className="cursor-grab cardResponsivness rounded border border-neutral-300 bg-[#DEDEDE] p-3  w-[256px] active:cursor-grabbing"
        >
          <p className=" text-[#606060] font-medium">{title}</p>
          <p className=" text-[#797979] text-[14px]">{description}</p>
          <div className="w-full flex justify-between">
            <p
              className={`text-xs text-white mt-2 ${
                priority === "Low"
                  ? "bg-green-500"
                  : priority === "Medium"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }  w-[70px] flex justify-center items-center h-7 rounded-[8px]`}
            >
              {priority}
            </p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setEditing(true)}
                className="text-neutral-400 hover:text-neutral-100 mr-2"
              >
                <FiEdit />
              </button>
              <button
                onClick={handleDelete}
                className="text-neutral-400 hover:text-neutral-100"
              >
                <FiTrash />
              </button>
            </div>
          </div>

          <p className={`text-sm font-semibold text-[#606060] mt-2`}>
            {deadline}
          </p>
        </motion.div>
      )}
    </>
  );
};

type DropIndicatorProps = {
  beforeId: string | null;
  column: string;
};

const DropIndicator = ({ beforeId, column }: DropIndicatorProps) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-transparent opacity-0"
    />
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

const DEFAULT_CARDS: CardType[] = [];
