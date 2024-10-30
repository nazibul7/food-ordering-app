import express from "express"
import { searchResturnat } from "../controllers/resturant2.controller"

const route=express.Router()

route.get('/search/:city',searchResturnat)

export default route