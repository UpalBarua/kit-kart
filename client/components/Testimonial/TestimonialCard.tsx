import Image from "next/image";
import React from "react";
import { VscPreview } from "react-icons/vsc";

const TestimonialCard = ({ review }) => {
  const { name, id, text, image } = review;
  return (
    <div className="p-4 border-r-2 border-green-500 ">
      <Image
        className="rounded-full h-14 w-14"
        src={image}
        alt=""
        height="70"
        width="70"
      ></Image>
      <div className="flex items-center gap-4 pt-4 text-green-500">
        <VscPreview></VscPreview>
        <h1 className="text-[1rem] font-bold">{name}</h1>
      </div>
      <h1 className="pt-3">{text}</h1>
    </div>
  );
};

export default TestimonialCard;
