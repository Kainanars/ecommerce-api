import mongoose, { Schema, Document } from 'mongoose';

export interface IProductDocument extends Document {
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  discount?: number;
  tags?: string[];
  brand?: string;
  ratings?: { average: number; count: number };
  relatedProducts?: string[];
}

const ProductSchema: Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    images: { type: [String], required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    discount: { type: Number },
    tags: { type: [String] },
    brand: { type: String },
    ratings: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },
    relatedProducts: { type: [String] },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model<IProductDocument>('Product', ProductSchema);
export default ProductModel;
