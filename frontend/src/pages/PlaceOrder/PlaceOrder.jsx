import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const PlaceOrder = () => {

  const { getTotalCartAmount,token,food_list,cartItems,url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const handleChange = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const placeOrder = async(e) =>{
    e.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id]>0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id] 
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,
    }
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
    if(response.data.success) {
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      alert("Error");
    }
  }

  const navigate = useNavigate();
  useEffect(() => {
    if(!token) {
      navigate('/cart')
    }
    else if(getTotalCartAmount()===0){
      navigate('/cart')
    }
  }, [token])
  
  

  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input name="firstName" onChange={handleChange} value={data.firstName} type="text" placeholder="First name" required />
          <input name="lastName" onChange={handleChange} value={data.lastName} type="text" placeholder="Last name" required />
        </div>

        <input name="email" onChange={handleChange} value={data.email} type="text" placeholder="Email address" required />
        <input name="street" onChange={handleChange} value={data.street} type="text" placeholder="Street" required />

        <div className="multi-fields">
          <input name="city" onChange={handleChange} value={data.city} type="text" placeholder="City" required />
          <input name="state" onChange={handleChange} value={data.state} type="text" placeholder="State" required />
        </div>

        <div className="multi-fields">
          <input name="zipcode" onChange={handleChange} value={data.zipcode} type="text" placeholder="Zip code" required />
          <input name="country" onChange={handleChange} value={data.country} type="text" placeholder="Country" required />
        </div>

        <input name="phone" onChange={handleChange} value={data.phone} type="text" placeholder="Phone" required />
      </div>
 
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type="submit">
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
