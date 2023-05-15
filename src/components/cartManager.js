class CarritoManager {
  constructor(productManager) {
    this.productManager = productManager;
    this.cart = []; 
  }

  async getCarrito() {
    return this.cart;
  }

  async addProductToCart(productId) {
    const product = await this.productManager.getProductById(productId);
    if (product) {
      this.cart.push(product);
      return "Producto agregado al carrito";
    } else {
      return "Producto no encontrado";
    }
  }

  async deleteProductFromCart(productId) {
    this.cart = this.cart.filter((product) => product.id !== productId);
    return "Producto eliminado del carrito";
  }

  async updateProductInCart(productId, quantity) {
    const product = this.cart.find((product) => product.id === productId);
    if (product) {
      product.quantity = quantity;
      return "Producto actualizado en el carrito";
    } else {
      return "Producto no encontrado en el carrito";
    }
  }
}

module.exports = CarritoManager;