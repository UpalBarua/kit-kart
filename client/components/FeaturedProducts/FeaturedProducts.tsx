import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
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

export default function App({ products }) {
  return (
    <div className="px-20">
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
        {products?.map((product) => (
          <SwiperSlide key={product._id} style={{ maxWidth: '20rem' }}>
            <ProductCard {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
