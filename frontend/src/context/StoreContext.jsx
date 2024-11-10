// import axios from "axios";
// import { createContext,  useEffect,  useState } from "react";


// export const StoreContext = createContext(null)

// const StoreContextProvider = (props) =>{

//   const [cartItems, setCartItems] = useState({})
//    const url = "http://localhost:4000"
//    const [token, setToken] = useState('')
//    const [food_list, setFood_list] = useState([])

//   const addToCart = async(itemId) => {
//     if(!cartItems[itemId]) {
//       setCartItems((prev)=>({...prev, [itemId]:1}))
//     }
//     else {
//       setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
//     }
//     //if we have tokenin that case when we add item in cart then it will be added to the database cartdata also. 
//     if(token) {
//       await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
//     }
//   }

//   const removeFromCart = async(itemId) =>{
//     setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
//     //if we have token in that case when we remove item in cart then it will be removed from the database cartdata also.
//     if(token) {
//       await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
//     }
//   }

//   const getTotalCartAmount = () =>{
//     let totalAmount = 0;
//     for(const item in cartItems){
//       if(cartItems[item] > 0) {
//         let itemInfo = food_list.find((product) => product._id === item);
//         totalAmount += itemInfo.price * cartItems[item]
//       }
//     }
//     return totalAmount
//   }

//   const fetchFoodList = async() =>{
//     const response = await axios.get(url+"/api/food/list");
//     setFood_list(response.data.data)
//   }

//   //get all cart items
//   const loadCartData = async(token) =>{
//     const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
//     setCartItems(response.data.cartData);
//   }

//   useEffect(() => {
//     async function loadData() {
//       await fetchFoodList()
//       if(localStorage.getItem("token")){
//         setToken(localStorage.getItem("token"))
//         await loadCartData(localStorage.getItem("token"));
//       }
//     }
//     loadData()
//   }, [])
  

  

//   const contextValue = {
//     food_list,
//     cartItems,
//     setCartItems,
//     addToCart,
//     removeFromCart,
//     getTotalCartAmount,
//     url,
//     token,
//     setToken
//   }
//   return (
//     <StoreContext.Provider value={contextValue}>
//       {props.children}
//     </StoreContext.Provider>
//   )
// }
// export default StoreContextProvider;



import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  // const url = "http://localhost:4000";
  const url = "https://tomato-ivdz.onrender.com";
  const [token, setToken] = useState("");
  const [food_list, setFood_list] = useState([]);

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
    }));

    if (token) {
      try {
        await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
      } catch (error) {
        console.error("Failed to add item to cart:", error);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
    }));

    if (token) {
      try {
        await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
      } catch (error) {
        console.error("Failed to remove item from cart:", error);
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      setFood_list(response.data.data);
    } catch (error) {
      console.error("Failed to fetch food list:", error);
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
      setCartItems(response.data.cartData || {});
    } catch (error) {
      console.error("Failed to load cart data:", error);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
