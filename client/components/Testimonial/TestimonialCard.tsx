import Image from "next/image";
import React from "react";
import { VscPreview } from "react-icons/vsc";

const TestimonialCard = ({ review }) => {
  const { name, id, text, image } = review;
  return (
    <div className=" border-r-2  border-green-500 p-4">
      <Image
        className="rounded-full"
        src={image}
        alt=""
        height="70"
        width="70"
      ></Image>
      <div className="flex gap-4 items-center pt-4 text-green-500">
        <VscPreview></VscPreview>
        <h1 className="text-[1rem] font-bold">{name}</h1>
      </div>
      <h1 className="pt-3">{text}</h1>
    </div>
  );
};

export default TestimonialCard;
