import Image from 'next/image';
import React from 'react';

function Category({ result }) {
  const { name, image, bgClass } = result;
  return (
    <div className={`flex flex-col justify-center items-center ${bgClass}`}>
      <h1 className="flex justify-center pt-2 font-semibold text-center">
        {name}
      </h1>
      <Image src={image} alt="" height="170" width="170"></Image>
    </div>
  );
}

export default Category;
