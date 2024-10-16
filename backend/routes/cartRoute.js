import express from 'express'
import { addToCart,removeFromCart,getCart } from '../controllers/cartController.js'
import autheMiddlelware from '../middleware/auth.js';

const cartRouter = express.Router();

cartRouter.post('/add', autheMiddlelware, addToCart)
cartRouter.post('/remove', autheMiddlelware, removeFromCart)
cartRouter.post('/get', autheMiddlelware, getCart)

export default cartRouter;