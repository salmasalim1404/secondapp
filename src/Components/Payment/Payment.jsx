import React, { useContext } from 'react'
import { cartContext } from '../../Context/CartContext'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Payment() {
const { CartID ,getUserCart } =  useContext(cartContext);
const nav = useNavigate()


function createPayment(){
const details = document.getElementById('details').value;
const city = document.getElementById('city').value;
const phone = document.getElementById('details').value;

const shipping =  {
    "shippingAddress":{
        "details": details,
        "phone": phone,
        "city": city
        }
}

  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${CartID}` , shipping , {
    headers : {
      token : localStorage.getItem('tkn')
    }
  }).then((res)=> {
    if (res.data.status === "success") {
      toast.success("Payment Successfully" , {duration : 1500 , position : "top-center"});
      getUserCart();
      setTimeout(()=>{
        nav('/products')
      } , 1500)
    }
  })
  .catch((err)=> {
console.log('err' , err);
toast.error("Payment failed" , {duration : 1500 , position : "top-center"})
  })





}




function createOnlinePayment(){
  const details = document.getElementById('details').value;
  const city = document.getElementById('city').value;
  const phone = document.getElementById('phone').value;
  
  const shipping =  {
      "shippingAddress":{
          "details": details,
          "phone": phone,
          "city": city
          }
  }
  
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartID}` , shipping , {
      headers : {
        token : localStorage.getItem('tkn')
      },
      params : { url : 'http://localhost:3000'}
    }).then((res)=> {
      if (res.data.status === "success") {
        // toast.success("Payment Successfully" , {duration : 1500 , position : "top-center"});
        // getUserCart();
        window.open(res.data.session.url, "_self")
     
      }
    })
    .catch((err)=> {
  console.log('err' , err);
  toast.error("Payment failed" , {duration : 1500 , position : "top-center"})
    })
  
  
  
  
  
  }





  return <>
<div className="w-50 py-4 m-auto">

<label htmlFor="city">City</label>
<input type="text" id='city' placeholder='City.....' className=' form-control mb-2'  />


<label htmlFor="phone">Phone</label>
<input type="text" id='phone' placeholder='Phone.....' className=' form-control mb-2'  />


<label htmlFor="details">Details</label>
<textarea type="text" id='details' placeholder='Details.....' className=' form-control mb-2'  ></textarea>

<button onClick={ createPayment } className='btn btn-info mt-3'>Confirm Cash Payment</button>
<button onClick={createOnlinePayment} className='btn btn-danger ms-2 mt-3'>Confirm Online Payment</button>
</div>


  </>
}
