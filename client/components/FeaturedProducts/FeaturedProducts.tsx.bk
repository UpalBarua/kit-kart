import { BiChevronLeftCircle, BiChevronRightCircle } from 'react-icons/bi';
import { EffectCoverflow, Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import ProductCard from '../ProductCard/ProductCard';

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
      main: 'Savor the refreshing sweetness of our handpicked Basket of Oranges. Bursting with juicy flavor, each orange is a delightful treat. Perfect for snacking, juicing, or adding zest to your recipes. Order now!',
      list: [
        'Juicy Delight: Bursting with flavor.',
        'Versatile Usage: Snack, juice, or zest.',
        'Handpicked Freshness: Premium quality.',
        "Order Now: Enjoy nature's bounty.",
      ],
    },
    _id: '646dcb8c7e9eeea0720850a7',
    title: 'A Bottle Of Pepsi (2 ltr)',
    imageUrl: 'https://i.ibb.co/BzK16MK/nikhil-e-Eumk-Kjg7-Jo-unsplash.jpg',
    ratingAvg: '4.3',
    reviewsCount: '2.2K',
    salesCount: '3K',
    price: 30,
    stock: 1200,
    seller: 'kit kart',
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

function FeaturedProducts() {
  return (
    <div className="max-w-3xl">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 50,
          modifier: 2.5,
          slideShadows: false,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container">
        {featuredProducts?.map((product) => (
          <SwiperSlide key={product._id}>
            <ProductCard {...product} />
          </SwiperSlide>
        ))}
        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <BiChevronLeftCircle />
          </div>
          <div className="swiper-button-next slider-arrow">
            <BiChevronRightCircle></BiChevronRightCircle>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
  );
}

export default FeaturedProducts;
