import React from 'react';

import meals from '../../assets/meal.png';
import vegetables from '../../assets/vegetables.png';
import organic from '../../assets/orgnic.png';
import drinks from '../../assets/cold.png';
import dairy from '../../assets/dairy1.png';
import fruits from '../../assets/fruits.png';
import ice from '../../assets/ice.png';
import clean from '../../assets/clean1.png';
import Category from './Category';

const results = [
  {
    id: '1',
    name: 'meal',
    image: meals,
    bgClass: 'bg-pink-100',
  },
  {
    id: '2',
    name: 'vegetables',
    image: vegetables,
    bgClass: 'bg-indigo-100',
  },
  {
    id: '3',
    name: 'organic',
    image: organic,
    bgClass: 'bg-orange-100',
  },
  {
    id: '4',
    name: 'drinks',
    image: drinks,
    bgClass: 'bg-purple-100',
  },
  {
    id: '5',
    name: 'dairy',
    image: dairy,
    bgClass: 'bg-lime-100',
  },
  {
    id: '6',
    name: 'fruits',
    image: fruits,
    bgClass: 'bg-teal-100',
  },
  {
    id: '7',
    name: 'ice',
    image: ice,
    bgClass: 'bg-fuchsia-100',
  },
  {
    id: '8',
    name: 'meal',
    image: clean,
    bgClass: 'bg-yellow-100',
  },
];

function Categories() {
  return (
    <section className="mt-14 mb-8">
      <div className="pb-6 pl-4">
        <h1 className="text-[1.5rem]">Browser Our Hottest</h1>
        <h1 className="text-[2rem] text-green-500 font-bold">Categories</h1>
      </div>
      <div className="grid grid-cols-1 gap-3 pr-4 pl-4 lg:grid-cols-4">
        {results?.map((result) => (
          <Category result={result} key={result.id}></Category>
        ))}
      </div>
    </section>
  );
}

export default Categories;
