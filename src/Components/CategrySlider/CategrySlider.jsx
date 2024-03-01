import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios'
import { useQuery } from "react-query";
import { FallingLines } from "react-loader-spinner";

export default function CategorySlider() {

function getCategory() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
}

const {data , isLoading , isError}  = useQuery('getCategory' , getCategory);
console.log(data , isLoading);

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

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      {data.data.data.map( (category , idx)=> <div key={idx} className="div">
      <img className="w-100" style={{height : "200px"}} src={category.image} alt="" />
      <h4>{category.name}</h4>
      </div>
      
      
      
     
    )}
     
    </Slider>
  );
}