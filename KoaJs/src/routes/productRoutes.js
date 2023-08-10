import Router from "koa-router";
import {
  handleAddProduct,
  handleDeleteProduct,
  handleGetProducts,
  handleGetProduct,
  handleUpdateProduct,
} from "../handlers/product/productHandlers";
import { productInputMiddleware } from "../middleware/productInputMiddleware";
Í
// Prefix all routes with /products
const router = new Router({
  prefix: "/api",
});

//Router will go here
router.get("/product/:id", handleGetProduct);
router.get("/products", handleGetProducts);
router.post("/product", productInputMiddleware, handleAddProduct);
router.put("/product/:id", productInputMiddleware, handleUpdateProduct);
router.delete("/product/:id", handleDeleteProduct);

export default router;
