import React from 'react';
import TestimonialCard from './TestimonialCard';

import image1 from '@/public/assets/images/Testimonial/review1 (1).jpg';
import image2 from '@/public/assets/images/Testimonial/review2.jpg';
import image3 from '@/public/assets/images/Testimonial/review3.jpg';
import image4 from '@/public/assets/images/Testimonial/review5.jpg';

const reviews = [
  {
    id: '01',
    image: image1,
    name: 'Asadur Rahman',
    text: 'This is a amazing website for any buyer and their product and service is very good',
  },
  {
    id: '02',
    image: image2,
    name: 'Neha Sharma',
    text: 'This is a amazing website for any buyer and their product and service is very good',
  },
  {
    id: '03',
    image: image3,
    name: 'Mahi Uddin',
    text: 'This is a amazing website for any buyer and their product and service is very good',
  },
  {
    id: '04',
    image: image4,
    name: 'Rajib Hasan',
    text: 'This is a amazing website for any buyer and their product and service is very good',
  },
];

const Testimonial = () => {
  return (
    <div className="grid grid-cols-1 gap-4 justify-center items-center pr-2 pl-2 lg:grid-cols-4">
      {reviews?.map((review) => (
        <TestimonialCard review={review} key={review?.id}></TestimonialCard>
      ))}
    </div>
  );
};

export default Testimonial;
