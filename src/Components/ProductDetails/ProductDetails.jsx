import React, { useContext } from 'react'
import {Navigate, useParams} from 'react-router-dom'
import axios from 'axios'
import { useQuery } from 'react-query';
import { FallingLines } from 'react-loader-spinner';
import {cartContext} from '../../Context/CartContext'
import toast from 'react-hot-toast';



export default function ProductDetails() {




 const {  putDataInCart } =useContext( cartContext );

//  console.log('putDataInCart' , putDataInCart);

async function addProduct(productId) {


let res = await putDataInCart(productId);

// console.log(" response " , res );
if (res) {
  toast.success("Added Successfully" , {duration : 1500 , position : "top-center"})
}else{
  toast.error("Something Wrong" , {duration : 1500 , position : "top-center"})
}


 }
 const { id } = useParams();

// const { putDataInCart } =  useContext(cartContext);

// // console.log('putDataInCart' , putDataInCart);
// async function addProduct(id) {


// const proo = await  putDataInCart(id);
// console.log ("adddedd" , proo);
// // if (proo.status == "success") {
// //   console.log('addedd');
// // }

// }




   

    function getProductsDetails(){


    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${ id }`)
    
    }
 const { data ,isError , isLoading }  = useQuery(`getProductsDetails-${id}` , getProductsDetails);
console.log("ProductsDetails" , data);
 if (isLoading) {
    return  <div className="d-flex justify-content-center align-items-center bg-primary vh-100 bg-opacity-50">
      <FallingLines
      color="#fff"
      width="100"
      visible={true}
      ariaLabel="falling-circles-loading"
      />
      </div>
    }
if (isError) {
    return <Navigate  to={'products'}/>
}
    const res = data.data.data
  return <>
  <div className="container">
    <div className="row align-items-center">
        <div className="col-md-3">
           <figure>
           <img className='w-100' src={res.imageCover} alt="" />
           </figure>
        </div>
        <div className="col-md-9">
            <article>
            <h2 className='fs-2 fw-bold'>{res.brand.name}</h2>
            <h3> { res.title} </h3>
            <h3>Category : {res.category.name} </h3>
           <p> {res.slug} </p>
            <p>{res.description}</p>
            
            <p>Quintity : {res.quantity} </p>
            <p><span><i className='fa-solid fa-star rating-color'> </i></span>  {res.ratingsAverage} </p>
            <p>Price : {res.price} LE</p>
            <p> {res.id} </p>
 <button onClick={ ()=> (addProduct(res.id)) } className='btn bg-main text-white'>Add To Cart </button>
            </article>
        </div>
    </div>
  </div>
  </>
}
