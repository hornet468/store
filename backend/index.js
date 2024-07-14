import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { registerValidation } from "./validations/auth.js";
import checkAuth from "./utils/check-auth.js";
import * as userController from "./controllers/user-controller.js";
import * as productsController from "./controllers/product-controller.js";
import * as basketController from "./controllers/basket-controller.js";

// Налаштування з'єднання з базою даних
mongoose
  .connect("mongodb+srv://nikita:nikita2009@cluster0.4rjdlsr.mongodb.net/market?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("DB OK"))
  .catch((err) => console.log(`DB error ${err}`));

// Налаштування порту сервера
const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

// Налаштування CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Дозволити запити з цього походження
  optionsSuccessStatus: 200,
  credentials: true // Дозволити використання куків та інших повноважень
};

app.use(cors(corsOptions));

// Запуск сервера
app.listen(PORT, (err) => {
  if (err) console.log(`Server error: ${err}`);
  console.log(`Server has been starting on port ${PORT}`);
});

// Маршрути
app.get("/api", (req, res) => {
  res.json({
    message: "hello backend"
  });
});

app.get("/", (req, res) => {
  res.send("hello + express");
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