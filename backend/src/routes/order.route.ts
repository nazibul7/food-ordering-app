import express from "express"
import { jwtCheck, jwtParse } from "../middleweres/auth"
import { createCheckoutSession, stripeWebhookHandler } from "../controllers/order.controller"

const router=express.Router()

router.post('/checkout/create-checkout-session',jwtCheck,jwtParse,createCheckoutSession)
router.post('/checkout/webhook',stripeWebhookHandler)

export default router