import express from "express";
import productRoute from "./route/ProductRoute";

const app = express();

app.use(express.json());

app.use("/api/v1/products", productRoute);

export default app;
