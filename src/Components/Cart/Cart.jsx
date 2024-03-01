import React, { useContext } from 'react'
import { cartContext } from '../../Context/CartContext'
import { FallingLines } from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import toast from 'react-hot-toast';

export default function Cart() {

const {numOfCartItems,totalCartPrice,allProducts , updateCount , deleteItem , ClearCart} = useContext(cartContext);

async function myDelete(id){
  const res =  await deleteItem(id);
  if (res) {
    toast.success("Deleted Successfully" , {duration : 1500 , position : "top-center"})
  }else{
    toast.error("Something Wrong" , {duration : 1500 , position : "top-center"})
  }
}

async function updatemypro(id , newCount) {
const res = await updateCount(id , newCount);
// console.log(res);
}

if ( !allProducts) {
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

{allProducts.length ?   <div className="container">
<div className="d-flex justify-content-between">
   <div>
   <h2>Shop Cart</h2>
    <h5>Total Cart Price : {totalCartPrice} LE</h5>
   </div>

   <Link to={'/payment'}>
   <button className='btn btn-primary'>Confirm Payment </button>
    </Link>
    
    
   
</div>
    <button onClick={ClearCart} className='btn btn-outline-danger mt-2 mb-2'>Clear All Products</button>

    {allProducts?.map((product , idx)=> <div key={idx} className="row p-1 border-1 border-bottom border-info align-items-center mb-1">
      <div className="col-md-1">
<figure>
  <img src={product.product.imageCover} alt=""  className='w-100'/>
</figure>
      </div>
      <div className="col-md-9">
    <h3>{product.product.title}</h3>
    <h5>Price : {product.price}</h5>
    <button onClick={()=> myDelete(product.product.id)} className='btn btn-outline-info'>Remove</button>
   {/* 1 : {product._id}
   2 : {product.product.id} */}
      </div>
      <div className="col-md-2">
        <div className='me-3 d-flex justify-content-between align-items-center'>
          <button onClick={ ()=> updatemypro(product.product.id , product.count +1)} className='btn  btn-outline-primary '>+</button>
          <p>{product.count}</p>
          <button disabled={product.count == 0} onClick={ ()=> updatemypro(product.product.id , product.count - 1)} className='btn  btn-outline-primary '>-</button>
        </div>
      </div>
    </div>  )}
  
  </div>: <h1>CART EMPTY</h1>}


  
  </>
}
