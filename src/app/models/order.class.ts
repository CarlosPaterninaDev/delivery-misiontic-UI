interface ProductsOrder {
  idProduct: string;
  count: number;
}

export class Order {
  idUser: number;
  products: ProductsOrder[];
  total: number;

  constructor(userId, product) {
    //   this.idUser = product.productId;
    //   this.name = product.productName;
    //   this.price = product.price;
    //   this.img = product.img;
    //   this.count = 0;
    //   this.description = product.description;
  }

  // calculateTotal() {
  //   this.total = this.count * this.price;
  // }
}
