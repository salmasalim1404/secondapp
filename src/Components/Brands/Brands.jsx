import axios from 'axios'
import React from 'react'
import { FallingLines } from 'react-loader-spinner';
import { useQuery } from 'react-query'


export default function Brands() {

function getBrands() {
    return  axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    // .then((res)=> {

    // })
    // .catch((err)=> {
    //  console.log("errrr" , err);
    // })
}
const { isLoading , data } = useQuery("getBrands" , getBrands);

console.log( "resultttts" , data);
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
    <div className="row">


   
    {data.data.data.map((brand , idx )=>     <div key={idx} className="col-md-3">
  
            <img src={brand.image} alt="" />
            <h3>{brand.name}</h3>
            <h4>{brand.slug}</h4>
          
        </div>)}

   
    
    </div>
  </div>
  
  
  
  </>
}
