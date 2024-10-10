import express from "express"
import { createUser, getCurrentUser, updateCurrentUser } from "../controllers/user.controller"
import { jwtCheck, jwtParse } from "../middleweres/auth"

const router = express.Router()

router.use(jwtCheck)
router.get('/', jwtCheck, jwtParse, getCurrentUser)
router.post('/create', createUser)
router.put('/', jwtParse, updateCurrentUser)

export default router