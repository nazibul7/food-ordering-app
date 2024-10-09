import express from "express"
import { createUser, updateCurrentUser } from "../controllers/user.controller"
import { jwtCheck, jwtParse } from "../middleweres/auth"

const router = express.Router()

router.use(jwtCheck)
router.post('/create', createUser)
router.put('/', jwtParse,updateCurrentUser)

export default router