import express from "express";
import { jwtCheck, jwtParse } from "../middleweres/auth";
import {
  createCheckoutSession,
  orderStatus,
  stripeWebhookHandler,
} from "../controllers/order.controller";

const router = express.Router();

router.post(
  "/checkout/create-checkout-session",
  jwtCheck,
  jwtParse,
  createCheckoutSession
);
router.post("/checkout/webhook", stripeWebhookHandler);
router.get("/", jwtCheck, jwtParse, orderStatus);

export default router;
