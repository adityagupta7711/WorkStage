"use client";
import React from "react";
import { CustomKanban } from "../board-ui/kanbanBoard";
import TopCards from "../board-ui/topCards";

const RightSidebar = () => {
  return (
    <div className="w-[80%] h-screen ml-[20%] relative">
      <div className="w-full  bg-[#DEDEDE] py-2 rounded-[8px] fixed z-50">
        <h2 className="text-[36px] text-[#080808] font-semibold ml-3">
          Good morning, Joe!
        </h2>
        <div className="flex gap-10 px-4">
          <TopCards
            title="Introducing tags"
            des="Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient."
            imgUrl="/top-cards-images/1.png"
          />
          <TopCards
            title="Introducing tags"
            des="Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient."
            imgUrl="/top-cards-images/2.png"
          />
          <TopCards
            title="Introducing tags"
            des="Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient."
            imgUrl="/top-cards-images/3.png"
          />
        </div>
      </div>
      <CustomKanban />
    </div>
  );
};

export default RightSidebar;
