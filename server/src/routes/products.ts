import { Router } from 'express';
import Product from '../models/Product';

const router = Router();

router.get('/', async (req, res) => {
  const { search, categories, sort } = req.query;
  let query: any = {};
  let sortOptions = {};

  if (search) {
    query.title = { $regex: new RegExp(search + '', 'i') };
  }

  if (categories) {
    query.category = { $in: categories.split(',') };
  }

  if (sort === 'ratings') {
    sortOptions = { ratingAvg: -1 };
  } else if (sort === 'sales') {
    sortOptions = { salesCount: -1 };
  } else if (sort === 'prices') {
    sortOptions = { price: -1 };
  } else {
    sortOptions = {};
  }

  try {
    let products = await Product.find(query).sort(sortOptions);

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }

    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ message: error?.message });
  }
});

// TODO - refactor
router.get('/:id', async (req, res) => {
  const { params } = req;

  try {
    const product = await Product.findById(params.id);
    res.status(200).json(product);
  } catch (error: any) {
    res.status(500).json({ message: error?.message });
  }
});

router.post('/', async (req, res) => {
  const { body } = req;

  try {
    const result = await Product.create(body);
    res.json(result);
  } catch (error: any) {
    res.send(error.message);
  }
});

router.get('/random', async (req, res) => {
  console.log('first');

  try {
    // const products = await Product.aggregate([{ $sample: { size: 5 } }]);
    const products = await Product.find({});
    console.log(products);
    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/', async (req, res) => {
  const { productId } = req.query;

  try {
    const result = await Product.findOneAndDelete({ _id: productId });
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
