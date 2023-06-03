import React from "react";
import TestimonialCard from "./TestimonialCard";

import image1 from ".././../assets/images/review1 (1).jpg";
import image2 from ".././../assets/images/review3 (1).jpg";
import image3 from ".././../assets/images/review3 (2).jpg";
import image4 from ".././../assets/images/review3 (3).jpg";

const reviews = [
  {
    id: "01",
    image: image1,
    name: "Asadur Rahman",
    text: "This is a amazing website for any buyer and their product and service is very good",
  },
  {
    id: "02",
    image: image1,
    name: "Neha Sharma",
    text: "This is a amazing website for any buyer and their product and service is very good",
  },
  {
    id: "03",
    image: image1,
    name: "Mahi Uddin",
    text: "This is a amazing website for any buyer and their product and service is very good",
  },
  {
    id: "04",
    image: image1,
    name: "Rajib Hasan",
    text: "This is a amazing website for any buyer and their product and service is very good",
  },
];

const Testimonial = () => {
  return (
    <section className="mt-10 mb-8">
      <div className="text-center pb-4 ">
        <h1 className="text-[1rem] text-green-500 font-bold">Testimonial</h1>
        <h1 className="text-[2rem] text-green-500 font-bold pb-6">
          What They Saying?
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 justify-center items-center pl-2 pr-2">
        {reviews?.map((review) => (
          <TestimonialCard review={review} key={review?.id}></TestimonialCard>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
