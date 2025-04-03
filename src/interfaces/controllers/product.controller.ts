import { Request, Response } from 'express';
import ProductService from '../services/product.service';

class ProductController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.body);
      const product = await ProductService.create(req.body);
      console.log(product);
      res.status(201).json(product);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'Erro desconhecido';
      res.status(500).json({ message: errMsg });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const products = await ProductService.getAll();
      res.status(200).json(products);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'Erro desconhecido';
      res.status(500).json({ message: errMsg });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const product = await ProductService.getById(req.params.id);
      if (!product) {
        res.status(404).json({ message: 'Produto não encontrado' });
        return;
      }
      res.status(200).json(product);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'Erro desconhecido';
      res.status(500).json({ message: errMsg });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const updatedProduct = await ProductService.update(req.params.id, req.body);
      if (!updatedProduct) {
        res.status(404).json({ message: 'Produto não encontrado' });
        return;
      }
      res.status(200).json(updatedProduct);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'Erro desconhecido';
      res.status(500).json({ message: errMsg });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const deletedProduct = await ProductService.delete(req.params.id);
      if (!deletedProduct) {
        res.status(404).json({ message: 'Produto não encontrado' });
        return;
      }
      res.status(200).json({ message: 'Produto removido com sucesso' });
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'Erro desconhecido';
      res.status(500).json({ message: errMsg });
    }
  }
}

export default new ProductController();
