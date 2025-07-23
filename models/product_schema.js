const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const reviewSchema = new Schema(
  {
    rating: Number,
    comment: String,
    date: Date,
    reviewerName: String,
    reviewerEmail: String,
  },
  { _id: false }
);

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: String,
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    discountPercentage: Number,
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    stock: {
      type: Number,
      default: 0,
    },
    category: String,
    tags: [String],
    sku: String,
    weight: Number,
    dimensions: {
      width: Number,
      height: Number,
      depth: Number,
    },
    warrantyInformation: String,
    shippingInformation: String,
    availabilityStatus: String,
    returnPolicy: String,
    minimumOrderQuantity: Number,
    meta: {
      barcode: String,
      qrCode: String,
    },
    images: [String],
    thumbnail: String,
    reviews: [reviewSchema],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Product = model("Product", productSchema);
module.exports = { Product };
