import Image from "next/image";
import React from "react";

const NewProductCard = ({ result }) => {
  const { id, img } = result;
  return (
    <div className="p-3 bg-indigo-100">
      <Image
        className="w-full"
        src={img}
        alt=""
        height="200"
        width="200"
      ></Image>
    </div>
  );
};

export default NewProductCard;
