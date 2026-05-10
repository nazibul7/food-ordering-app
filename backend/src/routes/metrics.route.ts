import express from "express"
import { getMetrics } from "../controllers/metrics.controller"

const router = express.Router()

router.get("/", getMetrics)

export default router