import express from "express"
import { upload } from "../middleweres/multer"
import { createResturant, getResturant, ordersResturant, updateOrderStatus, updateResturant } from "../controllers/myresturant.controller"
import { jwtCheck, jwtParse } from "../middleweres/auth"

const router = express.Router()

router.post('/', jwtCheck, jwtParse, upload.single("imageFile"), createResturant)
router.get('/', jwtCheck, jwtParse, getResturant)
router.put('/', jwtCheck, jwtParse, upload.single("imageFile"), updateResturant)
router.get('/order', jwtCheck, jwtParse, ordersResturant)
router.patch('/order/:orderId/status', jwtCheck, jwtParse, updateOrderStatus)
export default router
