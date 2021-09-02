export class ProductOrder {
  idProduct: number;
  name: string;
  price: number;
  description: number;
  img: string;
  count: number;
  total: number;

  constructor(product) {
    this.idProduct = product.productId;
    this.name = product.productName;
    this.price = product.price;
    this.img = product.img;
    this.count = 0;
    this.description = product.description;
  }

  calculateTotal() {
    this.total = this.count * this.price;
  }
}
