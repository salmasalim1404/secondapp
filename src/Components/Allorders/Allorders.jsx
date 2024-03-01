import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FallingLines } from 'react-loader-spinner'

export default function Allorders() {

const [allorders, setAllorders] =useState(null)



function getUserOrder() {
  const userID = localStorage.getItem('userID')
  axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userID}`)
  .then((res)=> {
    setAllorders(res.data)
  })
  .catch((err)=> {
    console.log("err" , err);
  })
}


useEffect(()=> {
  getUserOrder();
} , []);



if ( !allorders) {
  return  <div className="d-flex justify-content-center align-items-center bg-primary vh-100 bg-opacity-50">
  <FallingLines
  color="#fff"
  width="100"
  visible={true}
  ariaLabel="falling-circles-loading"
  />
  </div>
}





  return <>
  <div className="container">
  <div className="row gy-3">

  { allorders.map( (order , idx )=>     {return <div key={idx} className="col-md-6">

<div className='order '>
  <div className="container">
    <div className="row">
      {order.cartItems.map( (item , idxx)=>   { return <div key={idxx} className="col-md-4">
        <div>
          <img className='w-100' src={item.product.imageCover} alt="" />
          <h3> {item.product.title}</h3>
             
          <h5> Price : {item.price}</h5>
          <h5>Count : {item.count} </h5>
        </div>
      </div>} )}
    
    </div>
  </div>
 <h5>Payment Method : {order.paymentMethodType}</h5>
 <h5>Order Price : {order.totalOrderPrice}</h5>
 <p>This Order Is Derevring To : {order.shippingAddress.city}</p>
 <p>Phone Number :{order.shippingAddress.phone}</p>
 <p>Details : {order.shippingAddress.details}</p>
</div>

</div>})}
 
    </div>
  </div>
  
  
  </>
}
