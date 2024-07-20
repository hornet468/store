import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { registerValidation } from "./validations/auth.js";
import checkAuth from "./utils/check-auth.js";
import * as userController from "./controllers/user-controller.js";
import * as productsController from "./controllers/product-controller.js";
import * as basketController from "./controllers/basket-controller.js";
import * as orderController from "./controllers/order-controller.js"

mongoose
  .connect("mongodb+srv://nikita:nikita2009@cluster0.4rjdlsr.mongodb.net/market?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("DB OK"))
  .catch((err) => console.log(`DB error ${err}`));

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000', 
  optionsSuccessStatus: 200,
  credentials: true 
};

app.use(cors(corsOptions));


app.listen(PORT, (err) => {
  if (err) console.log(`Server error: ${err}`);
  console.log(`Server has been starting on port ${PORT}`);
});

app.post("/register", registerValidation, userController.register);
app.post("/login", userController.login);
app.get("/me", checkAuth, userController.authMe);

app.get("/products", productsController.getProducts);
app.post("/products", productsController.addProducts);
app.delete("/product/:id", productsController.deleteProductById);
app.get("/product/:id", productsController.getProductById);

app.post("/basket", basketController.addProductToBasket);
app.delete("/basket/:IdProduct", basketController.deleteProductWithBasket);
app.get("/basket", basketController.getBasket);

app.post("/order", orderController.order);