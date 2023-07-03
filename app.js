/** @format */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import MongoDB from "./Config/db.js";
import userRoute from "./routes/userRoute.js";
 import orderRoute from './routes/orderRoute.js'
import productsRoute from "./routes/productsRoute.js";
import { errorHandler, notFound } from "./middleware/errorMiddlewares.js";

dotenv.config();
const app = express();
MongoDB();
app.use(cors());
app.use(express.json());

app.use("/api/products", productsRoute);
app.use("/api/users", userRoute);
app.use('/api/orders', orderRoute)

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server Runing on localhost ${PORT}`));
