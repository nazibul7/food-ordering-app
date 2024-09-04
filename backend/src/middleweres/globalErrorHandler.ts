import { NextFunction, Request, Response } from "express";
import { CustomError } from "./errorHandler";

export const globalErrorHandlerMiddleware = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Something went wrong!"
    res.status(statusCode).json(message)
}