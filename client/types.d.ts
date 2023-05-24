interface IProduct {
  _id: string;
  title: string;
  imageUrl: string;
  ratingAvg: number;
  reviewsCount: string;
  salesCount: string;
  price: string;
  stock: number;
  seller: string;
  description: {
    main: string;
    list: string[];
  };
}
