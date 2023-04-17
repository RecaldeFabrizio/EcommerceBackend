const Router = require("express");
const ProductManager = require("../components/ProductManager.js");

const carritoRoutes = (Product) => {
  const router = Router();
  const productManager = new ProductManager();

  router.get("/", async (req, res) => {

    res.send({});
  });

  router.post("/:cid", async (req, res) => {
    const { pid } = req.params;
    const product = await productManager.getProductById(pid);

    if (!product) {
      return res.status(404).send("Producto no encontrado");
    }

    res.send(`Producto ${product.title} agregado al carrito`);
  });

  return router;
};

module.exports = { carritoRoutes };