import React from "react";

const ProvideCard = ({ result }) => {
  const { id, provide_name, icon, talking } = result;
  return (
    <div className="w-full lg:w-[300px] text-center items-center justify-center ml-4">
      <h1 className="flex items-center justify-center text-[3rem] text-green-500 pb-6 ">
        {icon}
      </h1>
      <h1 className="text-[1.5rem] pb-2 text-green-500 font-bold">
        {provide_name}
      </h1>
      <h1 className="text-gray-500">{talking}</h1>
    </div>
  );
};

export default ProvideCard;
