const express = require("express");
const router = express.Router();
const {
  processPayment,
  sendStripeApiKey,
} = require("../controller/paymentController");
const { userAuthenticated } = require("../middleware/isAuthentiCated");

router.route("/process/payment").post(userAuthenticated, processPayment);
router.route("/stripeapikey").get(userAuthenticated, sendStripeApiKey);

module.exports = router;
