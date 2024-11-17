import { Request, Response } from "express";
import Stripe from "stripe";
import { Resturant, TMenuItemType } from "../models/resturant.model";

const STRIPE = new Stripe(process.env.STRIPE_API_KEY as string)
const FRONTEND_URL = process.env.FRONTEND_URL

type TCheckoutSessionRequest = {
    cartItems: {
        menuItemId: string
        name: string
        quantity: number
    }[],
    deliveryDeatils: {
        email: string
        name: string
        addressLine1: string
        city: string
    },
    resturantId: string
}

export const createCheckoutSession = async (req: Request, res: Response) => {
    try {
        const checkoutSessionRequest: TCheckoutSessionRequest = req.body
        const resturant = await Resturant.findById(checkoutSessionRequest.resturantId)
        if (!resturant) {
            return res.status(404).json("Resturant not found")
        }
        const lineItem = createLineItems(checkoutSessionRequest, resturant.menuItems)
        const session = await createSession(lineItem, "TEST_ORDER_ID", resturant.deliveryPrice, resturant._id.toString())
        if (!session.url) {
            return res.status(500).json("Error creating stripe session")
        }
        return res.json({ url: session.url })
    } catch (error: any) {
        console.log(error);
        res.status(500).json(error.raw.message)
    }
}

const createLineItems = (checkoutSessionRequest: TCheckoutSessionRequest, menuItems: TMenuItemType[]) => {
    const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
        const menuItem = menuItems.find((item) => item.name == cartItem.name)
        if (!menuItem) {
            throw new Error(`Menuitem not found ${cartItem.menuItemId}`)
        }
        const line_item: Stripe.Checkout.SessionCreateParams.LineItem = {
            price_data: {
                currency: "usd",
                unit_amount: menuItem.price,
                product_data: {
                    name: menuItem.name
                }
            },
            quantity: Number(cartItem.quantity)
        }
        return line_item
    })
    return lineItems
}

const createSession = async (lineItem: Stripe.Checkout.SessionCreateParams.LineItem[], orderId: string, deliveryPrice: number, resturantId: string) => {
    const sessionData = await STRIPE.checkout.sessions.create({
        line_items: lineItem,
        shipping_options: [
            {
                shipping_rate_data: {
                    display_name: "Delivery",
                    type: "fixed_amount",
                    fixed_amount: {
                        amount: deliveryPrice,
                        currency: "usd"
                    }
                }
            }
        ],
        mode: "payment",
        metadata: {
            orderId,
            resturantId
        },
        success_url: `${FRONTEND_URL}/order-status?success=true`,
        cancel_url: `${FRONTEND_URL}/detail/${resturantId}?cancelled=true`
    })
    return sessionData
}