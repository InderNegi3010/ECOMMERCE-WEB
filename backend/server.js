import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartRouter.js";
import orderRouter from "./routes/orderRouter.js";


dotenv.config();




// App configuration
const app = express();
const port = process.env.PORT || 8080;
connectDB();
connectCloudinary()

// Middleware
app.use(cors({
  origin: [
    'https://forever-clothingindernegi.netlify.app',  // Your deployed frontend
    'http://localhost:5173',                          // Vite frontend dev server
    'http://localhost:5174',                          // Vite admin panel dev server
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get("/", (req, res) => {
  res.send("API is Working");
});

app.listen(port, () => console.log("Server started on Port: " + port));
