import express, { Request, Response } from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import userRoutes from "./routes/user.route"
import { globalErrorHandlerMiddleware } from "./middleweres/globalErrorHandler"

const app = express()

// middlewares
app.use(express.json())
app.use(cors())
app.get('/health',async(req:Request,res:Response)=>{
    res.send("Health OK!")
})
app.use('/api/v1/user',userRoutes)

// Global error handling middlewares

app.use(globalErrorHandlerMiddleware)

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log('Connected to MongoDB database');
            console.log(`Server is listening on port ${process.env.PORT}`);
        })
    })
    .catch((error) => {
        console.log(`MongoDB connection error ${error}`);
    })
