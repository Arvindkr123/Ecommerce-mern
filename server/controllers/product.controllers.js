import ProductModel from "../models/product.models.js";

export const createProduct = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You do not have permission to create this product" });
    }

    const { title, description, price, category, stock } = req.body;
    const image = req.file;

    if (!image) {
      return res.status(400).json({ message: "Please upload an image" });
    }

    const product = new ProductModel({
      title,
      description,
      price,
      category,
      stock,
      image: image.path,
    });

    await product.save();

    res.status(200).json({ message: "product created successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
