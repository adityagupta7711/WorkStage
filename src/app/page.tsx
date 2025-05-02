// pages/index.tsx
"use client";
import React from "react";
import LeftSidebarnavigation from "@/components/leftbarNavigation.tsx/page";
import RightSidebar from "@/components/rightBarboardSec.tsx/page";

const Home: React.FC = () => {
  return (
    <main className="h-screen w-full bg-[#DEDEDE] relative">
      <div className="h-screen w-full bg-[#DEDEDE] flex absolute">
        <LeftSidebarnavigation />
        <RightSidebar />
      </div>
    </main>
  );
};

export default Home;
