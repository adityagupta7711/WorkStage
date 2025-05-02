import Image from "next/image";
import React from "react";

import CreateNewBtn from "../board-ui/createNewBtn";
import { CiSettings } from "react-icons/ci";
import { FiLoader } from "react-icons/fi";
import { IoAnalyticsSharp, IoNotificationsOutline } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";
import {
  MdOutlineViewKanban,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { RiHome3Line } from "react-icons/ri";
import { TfiDownload } from "react-icons/tfi";
import Link from "next/link";

interface SidebarItemProps {
  Icon: React.ComponentType<{ size: number; color: string }>;
  label: string;
  bg?: string;
  link: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ Icon, label, bg, link }) => (
  <Link
    href={`${link}`}
    className={`w-full gap-3 px-2 py-1.5 ${
      bg || "hover:bg-[#DEDEDE]"
    } border border-neutral-300 flex items-center rounded-[4px] cursor-pointer`}
  >
    <Icon size={24} color="#797979" />
    <p className="text-[#797979] text-[20px]">{label}</p>
  </Link>
);

const sidebarItems: SidebarItemProps[] = [
  { Icon: RiHome3Line, label: "Home", bg: "bg-[#DEDEDE]", link: "/" },
  { Icon: MdOutlineViewKanban, label: "Board", link: "/Board" },
  { Icon: CiSettings, label: "Setting", link: "/" },
  { Icon: LuUsers, label: "Teams", link: "/" },
  { Icon: IoAnalyticsSharp, label: "Analytics", link: "/" },
];

const LeftSidebarnavigation: React.FC = () => {
  return (
    <div className="fixed left-0 p-4 top-0 w-[20%] h-screen bg-white overflow-y-scroll border-r border-neutral-300 flex flex-col justify-between">
      <div>
        <div className="flex gap-4 items-center">
          <Image src="/Frame 330.svg" alt="Logo" height={31} width={31} />
          <p className="text-[20px] font-medium text-[#080808]">Joe Gardner</p>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="flex gap-2">
            <IoNotificationsOutline size={24} color="#666666" />
            <FiLoader size={24} color="#666666" />
            <MdKeyboardDoubleArrowRight size={24} color="#666666" />
          </div>
          <button className="w-[69px] text-sm h-[35px] rounded-[4px] flex justify-center items-center bg-[#F4F4F4] text-[#797979]">
            Logout
          </button>
        </div>

        <div className="flex flex-col gap-2 mt-5">
          {sidebarItems.map(({ Icon, label, bg, link }) => (
            <SidebarItem
              key={label}
              Icon={Icon}
              label={label}
              bg={bg}
              link={link}
            />
          ))}
        </div>

        <div className="mt-4">
          <CreateNewBtn w="100%" h="52px" />
        </div>
      </div>

      <div className="w-full py-2 flex items-center gap-2 bg-[#F3F3F3] rounded-[8px] px-2">
        <TfiDownload size={28} color="#666666" />
        <div>
          <h4 className="text-[#666666] text-[20px] font-medium">
            Download the app
          </h4>
          <p className="text-[#666666] text-sm -mt-1">
            Get the full experience
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebarnavigation;
