import express from "express"
import { addToCart, getToCart, updateToCart } from "../controllers/cartController.js"
import authUser from "../middleware/auth.js"

const cartRouter = express.Router()

cartRouter.post("/add",authUser, addToCart)
cartRouter.post("/get",authUser, getToCart)
cartRouter.post("/update", authUser, updateToCart)

export default cartRouter