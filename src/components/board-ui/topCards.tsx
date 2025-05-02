import React from "react";

interface cardProps {
  imgUrl: string;
  title: string;
  des: string;
}
const TopCards = ({ imgUrl, title, des }: cardProps) => {
  return (
    <div className="w-[24%] h-[123px] bg-white flex justify-between items-center gap-3 px-2">
      <img
        src={`${imgUrl}`}
        height={200}
        width={200}
        alt=""
        className="h-[50%] w-32"
      ></img>
      <div>
        <p className="text-[#757575] font-semibold">{title}</p>
        <p className="text-[#868686] text-[14px]">{des}</p>
      </div>
    </div>
  );
};

export default TopCards;
