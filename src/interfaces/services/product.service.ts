import ProductModel, { IProductDocument } from '../../infra/database/models/ProductModel';

class ProductService {
  async create(data: Partial<IProductDocument>): Promise<IProductDocument> {
    const product = new ProductModel(data);
    return await product.save();
  }

  async getAll(): Promise<IProductDocument[]> {
    return await ProductModel.find();
  }

  async getById(id: string): Promise<IProductDocument | null> {
    return await ProductModel.findById(id);
  }

  async update(id: string, data: Partial<IProductDocument>): Promise<IProductDocument | null> {
    return await ProductModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<IProductDocument | null> {
    return await ProductModel.findByIdAndDelete(id);
  }
}

export default new ProductService();
