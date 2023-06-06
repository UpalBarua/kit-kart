import Image from "next/image";
import React from "react";

const Category = ({ result }) => {
  const { name, image, bgClass } = result;
  return (
    <div className={`flex flex-col items-center justify-center ${bgClass}`}>
      <h1 className="flex justify-center pt-2 font-semibold text-center ">
        {name}
      </h1>
      <Image src={image} alt="" height="170" width="170"></Image>
    </div>
  );
};

export default Category;

// bg-pink-100
// bg-orange-100
// bg-purple-100
// bg-red-100
//
//
