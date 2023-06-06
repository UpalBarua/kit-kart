import React from "react";

import Provide from "@/components/Provide/Provide";
import Testimonial from "@/components/Testimonial/Testimonial";
import Categories from "@/components/Categories/Categories";
import BestSelling from "@/components/BestSelling/BestSelling";
import NewProduct from "@/components/NewProduct/NewProduct";
import Hero from "@/components/Hero/Hero";

const home = () => {
  return (
    <section>
      <Hero></Hero>
      <Categories></Categories>
      <BestSelling></BestSelling>
      <NewProduct></NewProduct>
      <Provide></Provide>
      <Testimonial></Testimonial>
    </section>
  );
};

export default home;
