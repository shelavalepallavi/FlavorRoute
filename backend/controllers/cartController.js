// import userModel from "../models/userModel.js"


// //add item to user cart
// const addToCart = async(req,res) =>{
//   try {
//     let userData = await userModel.findById(req.body.userId)
//     let cartData = await userData.cartData;
//     if(!cartData[req.body.itemId]){
//       cartData[req.body.itemId] = 1
//     }
//     else {
//       cartData[req.body.itemId] += 1
//     }
//     await userModel.findByIdAndUpdate(req.body.userId,{cartData});
//     res.json({success:true,message:"Added to Cart"});
//   } catch (error) {
//     console.log(error);
//     res.json({success:false,message:"Error"})
//   }
// }

// //remove item from user cart
// const removeFromCart = async(req,res) =>{
//   try {
//     let userData = await userModel.findById(req.body.userId)
//     let cartData = await userData.cartData;
//     if(cartData[req.body.itemId]>0) {
//       cartData[req.body.itemId] -= 1;
//     }
//     await userModel.findByIdAndUpdate(req.body.userId,{cartData});
//     res.json({success:true,message:"Removed From Cart"})
//   } catch (error) {
//     console.log(error);
//     res.json({success:false,message:"Error"})
//   }
// }

// //fetch user cart data
// const getCart = async(req,res) =>{
//   try {
//     let userData = await userModel.findById(req.body.userId);
//     let cartData = await userData.cartData;
//     res.json({success:true,cartData})
//   } catch (error) {
//     console.log(error);
//     res.json({success:false,message:"Error"})
//   }
// }

// export {addToCart, removeFromCart, getCart}


import userModel from "../models/userModel.js";

// Add item to user cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Initialize cartData if it doesn't exist
    if (!userData.cartData) {
      userData.cartData = {};
    }

    // Update or initialize item quantity
    if (!userData.cartData[itemId]) {
      userData.cartData[itemId] = 1;
    } else {
      userData.cartData[itemId] += 1;
    }

    await userData.save();
    res.json({ success: true, message: "Added to Cart", cartData: userData.cartData });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Remove item from user cart
const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Initialize cartData if it doesn't exist
    if (!userData.cartData) {
      userData.cartData = {};
    }

    const currentQuantity = userData.cartData[itemId] || 0;
    if (currentQuantity <= 1) {
      // Remove the item from the cart if quantity is 1 or less
      delete userData.cartData[itemId];
    } else {
      // Decrement the quantity
      userData.cartData[itemId] -= 1;
    }

    await userData.save();
    res.json({ success: true, message: "Removed from Cart", cartData: userData.cartData });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Fetch user cart data
const getCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Initialize cartData if it doesn't exist
    if (!userData.cartData) {
      userData.cartData = {};
    }

    res.json({ success: true, cartData: userData.cartData });
  } catch (error) {
    console.error("Error fetching cart data:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { addToCart, removeFromCart, getCart };
