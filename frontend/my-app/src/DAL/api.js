import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001",
});

export const productsAPI = {
  async getProducts() {
    try {
      const response = await instance.get("/products");
      return response.data;
    } catch (err) {
      console.error("Error in API response:", err);
      throw err;
    }
  },
  async getOneProduct(id) {
    try {
      const response = await instance.get(`/product/${id}`);
      return response.data;
    } catch (err) {
      console.error("Error fetching product details:", err);
    }
  },
};

export const basketAPI = {
  async getBasket() {
    try {
      const response = await instance.get("/basket");
      return response.data;
    } catch (err) {
      console.error("Error fetching basket:", err);
    }
  },
  async addProductToBasket(IdProduct, Name, Price) {
    try {
      const response = await instance.post("/basket", {
        IdProduct,
        Name,
        Price,
      });
      return response.data;
    } catch (err) {
      console.error("Error adding product to basket", err);
      throw err;
    }
  },
  async deleteProductWithBasket  (IdProduct)  {
    try {
      const response = await instance.delete(`/basket/${IdProduct}`);
      return response.data;
    } catch (err) {
      
    }
  }
};

export const authAPI = {
  async register (password, fullName,email) {
    try {
      const response = await instance.post("/register", {
        password,
        fullName,
        email,
      });
      return response.data;
    } catch (err) {
      console.log("Failed to register", err);
    }
  },
  async login (password, email) {
    try {
      const response = await instance.post("/login", {
        password,
        email,
      });
      return response.data;
    } catch (err) {
      console.log("Failed to fetch response login data", err);
    }
  },
  async getAuthMe ()  {
    try {
      const response = await instance.get("/me");
      return response.data;
    } catch (err) {
      console.log("Failed to get me");
    }
  } 
}

instance.interceptors.request.use( (config) => {
    config.headers.Authorization = window.localStorage.getItem("token");
    return config;
});