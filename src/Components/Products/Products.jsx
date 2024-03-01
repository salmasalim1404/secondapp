import React, { useContext, useEffect, useState } from 'react'
import { FallingLines } from 'react-loader-spinner';
import axios from 'axios'
import { useQuery } from 'react-query';
import SimpleSlider from '../HomeSlider/HomeSlider';
import CategorySlider from '../CategrySlider/CategrySlider';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';


export default function Products() {

const { putDataInCart , counter , setCounter } =useContext( cartContext );

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




//  const [allProducts , setallProducts] = useState(null)
 async function getAllProducts(){
 return  axios.get(  'https://ecommerce.routemisr.com/api/v1/products'  )
//  await  axios.get(  'https://ecommerce.routemisr.com/api/v1/products'  )
//  .then( (res) => {
//   setallProducts(res.data.data)
//  })
//  .catch( (err) => {
//  console.log(err);
//  })
  }

  // useEffect( ()=>{
  //   getAllProducts()
  // } , [])
const { isLoading , data , error , isFetching}=  useQuery('getAllProducts' , getAllProducts);

// console.log(data?.data);
console.log(data?.data.data);
console.log(isLoading);


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
  return <>

<div className="container">
<div className="row mt-5 mb-5">
  <div className="col-md-10">
  <SimpleSlider />
  </div>
  <div className="col-md-2">
    <div>
      <img className='w-100 ' style={{height : "150px"}} src={require('../../images/grocery-banner.png')} alt="" />
    </div>
    <div>
      <img className='w-100 ' style={{height : "150px"}} src={require('../../images/grocery-banner-2.jpeg')} alt="" />
    </div>
  </div>
</div>
  
  <CategorySlider />

    <div className="row products">


      {data.data.data.map(  (product , idx )=> { return <div key={idx} className="col-md-2">
      
    <Link to={`/ProductDetails/${product.id}`}>
    
    <div className="product">
        {/* imageCover */}
        <img src={product.imageCover} className='w-100' alt="" />
        <h3 className='h6 text-main text-center'>{product.category.name}</h3>
        <h2 className='h5 text-center'>{product.title.split(' ').slice(0,2).join(' ')}</h2>
        <div className='d-flex justify-content-between'>
       {product.priceAfterDiscount ?  <p><span className='text-decoration-line-through'>{product.price}</span> - {product.priceAfterDiscount} LE</p> :  <p>{product.price} LE</p>}
        <p> <span><i className='fa-solid fa-star rating-color'> </i></span>{product.ratingsAverage}</p>
        </div>
        </div>
    
    
    </Link>
    <button   onClick={()=> (addProduct(product.id) )}  className='btn btn-dark m-auto d-block mb-3  '>+</button>

  
      </div>})}



    </div>
  </div>

</>


}
