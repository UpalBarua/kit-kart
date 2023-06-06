import React from "react";

import { CiDeliveryTruck } from "react-icons/ci";
import { RiPriceTagFill } from "react-icons/ri";
import { FaHandsWash } from "react-icons/fa";
import ProductCard from "../ProductCard/ProductCard";
import ProvideCard from "./ProvideCard";

const results = [
  {
    id: "01",
    provide_name: "Great Daily Deal",
    icon: <FaHandsWash></FaHandsWash>,
    talking:
      "Discover incredible savings every day with our great daily deals! Our e-commerce site. ",
    bgClass: "bg-orange-100",
  },
  {
    id: "02",
    provide_name: "Free Delivery",
    icon: <CiDeliveryTruck></CiDeliveryTruck>,
    talking:
      "we provide complimentary shipping on every order, ensuring a seamless shopping experience",
    bgClass: "bg-indigo-100",
  },
  {
    id: "03",
    provide_name: "Best Price Ever",
    icon: <RiPriceTagFill></RiPriceTagFill>,
    talking:
      " We try and enjoy the satisfaction of knowing you've found the best price ever on your desired items.",
    bgClass: "bg-pink-100",
  },
];

const Provide = () => {
  return (
    <section className="mb-8">
      <div className="pb-6 pl-6 pt-14">
        <h1 className="text-[1.5rem] font-bold text-green-500">
          We always provide <br />
          you the best in Town
        </h1>
        <h1 className="pt-2 text-gray-600">
          we work with you in daily product. whenever you watch your product you
          <br />
          can watch and buy more and more. come here and buy .
        </h1>
      </div>
      <div className="grid items-center justify-center grid-cols-1 gap-6 lg:grid-cols-3">
        {results?.map((result) => (
          <ProvideCard result={result} key={result?.id}></ProvideCard>
        ))}
      </div>
    </section>
  );
};

export default Provide;
