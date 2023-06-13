import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { EffectCoverflow, Pagination } from 'swiper';

import ProductCard from '../ProductCard/ProductCard';
import { TbCurrencyTaka } from 'react-icons/tb';

const featuredProducts = [
  {
    description: {
      main: 'Experience the crunch of our delectable Bag of Chips. Handpicked potatoes, expertly seasoned, and crisped to perfection. Indulge in the ultimate snacking pleasure. Perfect for movie nights or anytime cravings strike. Satisfaction guaranteed. Order now!',
      list: [
        'Premium Quality: Handpicked potatoes, superior snacking.',
        'Irresistible Flavor: Expertly seasoned, crispy perfection.',
        'Versatile Snacking: Movie nights or cravings, our perfect companion.',
        'Guaranteed Satisfaction: We stand behind our chips, guaranteed delight.',
      ],
    },
    _id: '646dcb8c7e9eeea0720850a6',
    title: 'A Bag Of Chips',
    imageUrl: 'https://i.ibb.co/9nYMNqH/Potato-Chips.jpg',
    ratingAvg: '4.7',
    reviewsCount: '2.2K',
    salesCount: '1.8K',
    price: 10,
    stock: 800,
    seller: 'Niaz er dokan',
  },

  {
    description: {
      main: 'Experience the crunch of our delectable Bag of Chips. Handpicked potatoes, expertly seasoned, and crisped to perfection. Indulge in the ultimate snacking pleasure. Perfect for movie nights or anytime cravings strike. Satisfaction guaranteed. Order now!',
      list: [
        'Premium Quality: Handpicked potatoes, superior snacking.',
        'Irresistible Flavor: Expertly seasoned, crispy perfection.',
        'Versatile Snacking: Movie nights or cravings, our perfect companion.',
        'Guaranteed Satisfaction: We stand behind our chips, guaranteed delight.',
      ],
    },
    _id: '646dcb8c7e9eeea0720850a8',
    title: 'A Bag Of Chips',
    imageUrl: 'https://i.ibb.co/9nYMNqH/Potato-Chips.jpg',
    ratingAvg: '4.7',
    reviewsCount: '2.2K',
    salesCount: '1.8K',
    price: 10,
    stock: 800,
    seller: 'Niaz er dokan',
  },
  {
    description: {
      main: 'Experience the crunch of our delectable Bag of Chips. Handpicked potatoes, expertly seasoned, and crisped to perfection. Indulge in the ultimate snacking pleasure. Perfect for movie nights or anytime cravings strike. Satisfaction guaranteed. Order now!',
      list: [
        'Premium Quality: Handpicked potatoes, superior snacking.',
        'Irresistible Flavor: Expertly seasoned, crispy perfection.',
        'Versatile Snacking: Movie nights or cravings, our perfect companion.',
        'Guaranteed Satisfaction: We stand behind our chips, guaranteed delight.',
      ],
    },
    _id: '646dcb8c7e9eeea0720850a8',
    title: 'A Bag Of Chips',
    imageUrl: 'https://i.ibb.co/9nYMNqH/Potato-Chips.jpg',
    ratingAvg: '4.7',
    reviewsCount: '2.2K',
    salesCount: '1.8K',
    price: 10,
    stock: 800,
    seller: 'Niaz er dokan',
  },
  {
    description: {
      main: 'Experience the crunch of our delectable Bag of Chips. Handpicked potatoes, expertly seasoned, and crisped to perfection. Indulge in the ultimate snacking pleasure. Perfect for movie nights or anytime cravings strike. Satisfaction guaranteed. Order now!',
      list: [
        'Premium Quality: Handpicked potatoes, superior snacking.',
        'Irresistible Flavor: Expertly seasoned, crispy perfection.',
        'Versatile Snacking: Movie nights or cravings, our perfect companion.',
        'Guaranteed Satisfaction: We stand behind our chips, guaranteed delight.',
      ],
    },
    _id: '646dcb8c7e9eeea0720850a8',
    title: 'A Bag Of Chips',
    imageUrl: 'https://i.ibb.co/9nYMNqH/Potato-Chips.jpg',
    ratingAvg: '4.7',
    reviewsCount: '2.2K',
    salesCount: '1.8K',
    price: 10,
    stock: 800,
    seller: 'Niaz er dokan',
  },
  {
    description: {
      main: 'Experience the crunch of our delectable Bag of Chips. Handpicked potatoes, expertly seasoned, and crisped to perfection. Indulge in the ultimate snacking pleasure. Perfect for movie nights or anytime cravings strike. Satisfaction guaranteed. Order now!',
      list: [
        'Premium Quality: Handpicked potatoes, superior snacking.',
        'Irresistible Flavor: Expertly seasoned, crispy perfection.',
        'Versatile Snacking: Movie nights or cravings, our perfect companion.',
        'Guaranteed Satisfaction: We stand behind our chips, guaranteed delight.',
      ],
    },
    _id: '646dcb8c7e9eeea0720850a8',
    title: 'A Bag Of Chips',
    imageUrl: 'https://i.ibb.co/9nYMNqH/Potato-Chips.jpg',
    ratingAvg: '4.7',
    reviewsCount: '2.2K',
    salesCount: '1.8K',
    price: 10,
    stock: 800,
    seller: 'Niaz er dokan',
  },
];

export default function App() {
  return (
    <div className="p-10">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        initialSlide={3}
        coverflowEffect={{
          rotate: 20,
          stretch: 80,
          depth: 30,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={true}
        modules={[EffectCoverflow]}
        className="mySwiper">
        {featuredProducts?.map(
          ({ _id, imageUrl, title, description, price }) => (
            <SwiperSlide key={_id} style={{ maxWidth: '20rem' }}>
              <Link
                className="grid gap-3 p-3 bg-white rounded-xl border-2 border-gray-100 shadow-md lg:p-4"
                href={`/products/${_id}`}>
                <Image
                  // style={{
                  //   minHeight: '100%',
                  // }}
                  className="object-cover object-center w-full h-full bg-gray-200 rounded-xl lg:h-56"
                  src={imageUrl}
                  alt={title}
                  height={200}
                  width={200}
                />
                <div>
                  <h3 className="text-lg font-bold">{title}</h3>
                  <p className="text-gray-600">
                    {description?.main.slice(0, 50)}
                  </p>
                  <footer className="flex justify-between items-center pt-3 lg:pt-5">
                    <p className="flex items-center text-2xl font-bold text-green-500 lg:text-3xl">
                      <TbCurrencyTaka />
                      <span>{price}</span>
                    </p>
                  </footer>
                </div>
              </Link>
            </SwiperSlide>
          )
        )}
      </Swiper>
    </div>
  );
}
