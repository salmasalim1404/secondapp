import axios from 'axios'
import React from 'react'
import { FallingLines } from 'react-loader-spinner';
import { useQuery } from 'react-query';

export default function Category() {

function getAllCategories() {
 return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);


}
const { isLoading , data , error , isFetching} = useQuery("getAllCategories" , getAllCategories);

// console.log( "gategoryyy" , data );
// console.log(isLoading);


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
    <div className="row">
    {data?.data.data.map((category , idx )=>     <div key={idx} className="col-md-3">
    
            <img src={category.image} className='w-100' style={{height : '350px'}} alt="" />
            <h3>{category.name}</h3>
            <h4>{category.slug}</h4>
           
        </div>)}
    </div>
  </div>
  
  </>
}
