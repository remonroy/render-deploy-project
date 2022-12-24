const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  productDetails,
  createProductReview,
  getProductReviews,
  deleteProductReviews,
  getAdminAllProducts,
} = require("../controller/productController");
const {
  userAuthenticated,
  authorizeRoles,
} = require("../middleware/isAuthentiCated");

const router = express.Router();

router.route("/products").get(getAllProducts);
router
  .route("/admin/products")
  .get(userAuthenticated, authorizeRoles("admin"), getAdminAllProducts); //admin all product get

router
  .route("/admin/products/new")
  .post(userAuthenticated, authorizeRoles("admin"), createProduct);

router
  .route("/admin/product/:id")
  .put(userAuthenticated, authorizeRoles("admin"), updateProduct)
  .delete(userAuthenticated, authorizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(productDetails);
router.route("/review").put(userAuthenticated, createProductReview);
router
  .route("/reviews")
  .get(getProductReviews)
  .delete(userAuthenticated, deleteProductReviews);

module.exports = router;
