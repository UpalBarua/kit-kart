import React from "react";
import TestimonialCard from "./TestimonialCard";

import image1 from ".././../assets/images/Testimonial/review1 (1).jpg";
import image2 from ".././../assets/images/Testimonial/review2.jpg";
import image3 from ".././../assets/images/Testimonial/review3.jpg";
import image4 from ".././../assets/images/Testimonial/review5.jpg";

const reviews = [
  {
    id: "01",
    image: image1,
    name: "Asadur Rahman",
    text: "This is a amazing website for any buyer and their product and service is very good",
  },
  {
    id: "02",
    image: image2,
    name: "Neha Sharma",
    text: "This is a amazing website for any buyer and their product and service is very good",
  },
  {
    id: "03",
    image: image3,
    name: "Mahi Uddin",
    text: "This is a amazing website for any buyer and their product and service is very good",
  },
  {
    id: "04",
    image: image4,
    name: "Rajib Hasan",
    text: "This is a amazing website for any buyer and their product and service is very good",
  },
];

const Testimonial = () => {
  return (
    <section className="mt-10 mb-8">
      <div className="pb-6 pl-4 ">
        <h1 className="text-[1.5rem] text-green-500 font-bold">Testimonial</h1>
        <h1 className="text-[1rem]  font-bold pb-6">What They Saying?</h1>
      </div>

      <div className="grid items-center justify-center grid-cols-1 gap-4 pl-2 pr-2 lg:grid-cols-4">
        {reviews?.map((review) => (
          <TestimonialCard review={review} key={review?.id}></TestimonialCard>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
