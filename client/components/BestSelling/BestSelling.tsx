import React from 'react';
import image1 from 'assets/images/bestselling/juice.png';
import image2 from 'assets/images/bestselling/fruits.png';
import image3 from 'assets/images/bestselling/ice.png';
import image4 from 'assets/images/bestselling/meat.png';
import image5 from 'assets/images/bestselling/drinks1.png';
import image6 from 'assets/images/bestselling/chips1.png';
import BestSellingCard from './BestSellingCard';
import { MdOutlineHotelClass } from 'react-icons/md';

const results = [
  {
    id: '1',
    img: image2,
  },
  {
    id: '2',
    img: image1,
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

function BestSelling() {
  return (
    <section className="mt-8">
      <div className="pb-6 pl-6">
        <div className="flex gap-4 items-center">
          <h1 className="text-[1.5rem] text-green-500 font-bold">
            Best Selling Foods
          </h1>
          <MdOutlineHotelClass className="text-[2rem] text-red-600"></MdOutlineHotelClass>
        </div>
        <h1 className="font-semibold">Stock Is Limited</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 pr-4 pl-4 lg:grid-cols-6">
        {results?.map((result) => (
          <BestSellingCard result={result} key={result?.id}></BestSellingCard>
        ))}
      </div>
    </section>
  );
}

export default BestSelling;
