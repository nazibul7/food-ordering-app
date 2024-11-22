import express from "express"
import { getResturant, searchResturnat } from "../controllers/resturant.controller"

const route = express.Router()

route.get('/search/:city', searchResturnat)
route.get('/:resturantId', getResturant)
export default route