import React from 'react';
import banner from '../../assets/images/banner.png';
import banner1 from '../../assets/images/banner2.jpg';
import banner2 from '../../assets/images/banner1.jpg';
import banner3 from '../../assets/images/banner4.jpg';
import Image from 'next/image';

function Hero() {
  return (
    <div className="flex justify-center items-center">
      <div>
        <Image src={banner} alt="" height={550} width={600}></Image>
      </div>
      <div>
        <div>
          <h1 className="text-[3rem] text-green-600 font-bold pb-2">
            Kit Kart
          </h1>
          <h1 className="text-[1.5rem] font-semibold">
            Bring the store to your door.{' '}
          </h1>
          <h1 className="text-[16px]">
            Discover new amazing Grocery Deals .We supply high quality organic
            products .
          </h1>
        </div>
        <div className="flex gap-4 pt-4">
          <button className="px-4 py-2 font-bold text-white bg-green-500 rounded">
            About us{' '}
          </button>
          <button className="px-4 py-2 font-bold text-green-500 rounded border border-green-500">
            Contact Now{' '}
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4 pt-4 pr-4">
          <Image src={banner1} alt="" height={200} width={200}></Image>
          <Image src={banner2} alt="" height={200} width={200}></Image>
          <Image src={banner3} alt="" height={180} width={180}></Image>
        </div>
      </div>
    </div>
  );
}

export default Hero;
