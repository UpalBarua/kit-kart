import React from 'react';

import image1 from 'assets/images/newProduct/biscuits.png';
import image2 from 'assets/images/newProduct/chicken.png';
import image3 from 'assets/images/newProduct/choclate.png';
import image4 from 'assets/images/newProduct/organic.png';
import image5 from 'assets/images/newProduct/vitamin.png';
import image6 from 'assets/images/newProduct/cold2.png';
import NewProductCard from './NewProductCard';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';

const results = [
  {
    id: '1',
    img: image1,
  },
  {
    id: '2',
    img: image2,
  },
  {
    id: '3',
    img: image3,
  },
  {
    id: '4',
    img: image4,
  },
  {
    id: '5',
    img: image5,
  },
  {
    id: '6',
    img: image6,
  },
];

const NewProduct = () => {
  return (
    <section className="mt-8 mb-8">
      <div className="pb-6 pl-6 ">
        <div className="flex items-center gap-6">
          <h1 className="text-[1.5rem] text-green-500 font-bold">
            New Products with 20% Off
          </h1>
          <MdOutlineProductionQuantityLimits className="text-[2rem] text-green-600"></MdOutlineProductionQuantityLimits>
        </div>
        <h1 className="font-semibold">
          Ensure with fresh and more stoke Product
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-4 pl-4 pr-4 lg:grid-cols-6">
        {results?.map((result) => (
          <NewProductCard result={result} key={result.id}></NewProductCard>
        ))}
      </div>
    </section>
  );
};

export default NewProduct;
