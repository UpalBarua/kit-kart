import { Router } from "express";
import Product from "../models/Product";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ message: error?.message });
  }
});

// TODO - refactor
router.get("/:id", async (req, res) => {
  const { params } = req;

  try {
    const product = await Product.findById(params.id);
    res.status(200).json(product);
  } catch (error: any) {
    res.status(500).json({ message: error?.message });
  }
});

router.post("/", async (req, res) => {
  const { body } = req;

  try {
    const result = await Product.insertMany(body);
    res.json(result);
  } catch (error) {
    res.send(error.message);
  }
});

router.delete("/", async (req, res) => {
  try {
    const result = await Product.findOne({
      title: "A Bottle Of Pepsi (2 Ltr)",
    });

    console.log(result);

    res.json(result);
  } catch (error) {
    res.json({ message: error.message });
  }
});

export default router;
