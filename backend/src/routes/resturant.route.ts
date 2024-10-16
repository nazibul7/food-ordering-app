import express from "express"
import { upload } from "../middleweres/multer"
import { createResturant } from "../controllers/resturant.controller"
import { jwtCheck, jwtParse } from "../middleweres/auth"

const router = express.Router()

router.post('/', jwtCheck, jwtParse, upload.single("imageFile"), createResturant)

export default router
