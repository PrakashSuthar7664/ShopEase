import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getAllOrdersController,
  orderStatusController,
} from "../controller/userAuthController.js";
import { isAdmin, requireSignIn } from "../middlewares/authmiddleware.js";

const route = express.Router();

route.post("/register", registerController);
route.post("/login", loginController);
route.post("/forgot-password", forgotPasswordController);
route.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ success: true });
});
route.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ success: true });
});

route.get("/test", requireSignIn, isAdmin, testController);

route.put("/profile", requireSignIn, updateProfileController);

route.put("/profile", requireSignIn, updateProfileController);

//orders
route.get("/orders", requireSignIn, getAllOrdersController);

//all orders
route.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
route.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);
export default route;
