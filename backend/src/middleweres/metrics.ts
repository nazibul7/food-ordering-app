import { Request, Response, NextFunction } from "express";
import client from "prom-client";

// collect default Node.js metrics
client.collectDefaultMetrics();

// counter metric
export const httpRequestsTotal = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
});

// custom HTTP request duration metric
export const httpRequestDurationMicroseconds = new client.Histogram({
  name: "http_request_duration_ms",
  help: "Duration of HTTP requests in ms",
  labelNames: ["method", "route", "status_code"],

  buckets: [50, 100, 200, 300, 500, 1000, 2000, 5000],
});

// middleware
export const metricsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now();

  res.on("finish", () => {
    if (req.path === "/metrics") {
      return next();
    }

    const duration = Date.now() - start;
    const route = req.route?.path || req.path;
    const statusCode = String(res.statusCode);

    httpRequestsTotal.labels(req.method, route, statusCode).inc();
    httpRequestDurationMicroseconds
      .labels(req.method, route, statusCode)
      .observe(duration);
  });

  next();
};
