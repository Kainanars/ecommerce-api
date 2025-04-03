export class Product {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public description: string,
    public category: string,
    public stock: number, // Quantidade em estoque
    public images: string[],
    public isActive: boolean = true,
    public discount?: number,
    public tags?: string[],
    public brand?: string, // Marca do produto (opcional)
    public ratings?: { average: number; count: number }, // Avaliações do produto
    public relatedProducts?: string[] // IDs de produtos relacionados (opcional)
  ) {}

  getDiscountedPrice(): number {
    if (this.discount) {
      return this.price - (this.price * this.discount) / 100;
    }
    return this.price;
  }

  isInStock(): boolean {
    return this.stock > 0;
  }

  // Método para adicionar imagens ao produto
  addImages(newImages: string[]): void {
    this.images.push(...newImages);
  }

  // Método para atualizar ratings ao produto
  updateRatings(newRating: number): void {
    const currentAverage = this.ratings?.average ?? 0;
    const currentCount = this.ratings?.count ?? 0;
    const totalRatings = currentAverage * currentCount;
    const updatedCount = currentCount + 1;
    const updatedAverage = (totalRatings + newRating) / updatedCount; // Nova média
    this.ratings = {
      average: updatedAverage,
      count: updatedCount,
    };
  }

  // Método para ativar ou desativar anuncio do produto
  toggleActiveStatus(): void {
    this.isActive = !this.isActive;
  }
}
