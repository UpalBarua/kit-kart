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
  },
  {
    id: "02",
    provide_name: "Free Delivery",
    icon: <CiDeliveryTruck></CiDeliveryTruck>,
    talking:
      "we provide complimentary shipping on every order, ensuring a seamless shopping experience",
  },
  {
    id: "03",
    provide_name: "Best Price Ever",
    icon: <RiPriceTagFill></RiPriceTagFill>,
    talking:
      " We try and enjoy the satisfaction of knowing you've found the best price ever on your desired items.",
  },
];

const Provide = () => {
  return (
    <section className="mb-8">
      <div className="text-center mt-14 pb-6">
        <h1 className="text-[2.3rem] font-bold text-green-500">
          We always provide <br />
          you the best in Town
        </h1>
        <h1 className="pt-2  text-gray-600">
          we work with you in daily product. whenever you watch your product you
          <br />
          can watch and buy more and more. come here and buy .
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 justify-center items-center">
        {results?.map((result) => (
          <ProvideCard result={result} key={result?.id}></ProvideCard>
        ))}
      </div>
    </section>
  );
};

export default Provide;
