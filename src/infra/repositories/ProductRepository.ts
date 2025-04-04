import ProductModel, { IProductDocument } from '@/infra/database/models/ProductModel';
import { Product } from '@/domain/entities/Product';
import { IProductRepository } from '@/domain/repositories/IProductRepository';

export class ProductRepository implements IProductRepository {
  async create(product: Product): Promise<Product> {
    const createdProduct = await ProductModel.create(product);
    return this.mapToDomain(createdProduct);
  }

  async findAll(): Promise<Product[]> {
    const products = await ProductModel.find();
    return products.map(this.mapToDomain);
  }

  async findById(id: string): Promise<Product | null> {
    const product = await ProductModel.findById(id);
    return product ? this.mapToDomain(product) : null;
  }

  async findWithFilters(
    filters: any,
    sort?: string,
    page?: number,
    limit?: number
  ): Promise<{ data: Product[]; total: number }> {
    const query = ProductModel.find(filters);
    const total = await ProductModel.countDocuments(filters);
    if (sort) {
      query.sort(sort);
    }
    if (page && limit) {
      query.skip((page - 1) * limit).limit(limit);
    }
    const products = await query.exec();
    return {
      data: products.map(this.mapToDomain),
      total,
    };
  }

  async update(id: string, data: Partial<Product>): Promise<Product | null> {
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updatedProduct ? this.mapToDomain(updatedProduct) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await ProductModel.findByIdAndDelete(id);
    return result !== null;
  }

  private mapToDomain(productDoc: IProductDocument): Product {
    return new Product(
      productDoc._id as string,
      productDoc.name,
      productDoc.price,
      productDoc.description,
      productDoc.category,
      productDoc.stock,
      productDoc.images,
      productDoc.isActive,
      productDoc.discount,
      productDoc.tags,
      productDoc.brand,
      productDoc.ratings,
      productDoc.relatedProducts
    );
  }
}
