import React from 'react';
import { Carousel } from 'react-bootstrap';
import './carousel.css'
const CustomCarousel = () => {
  return (
    <div className="parent">
      <Carousel className="child">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400"
            alt="Second slide"
          />
        </Carousel.Item>
        {/* Add more Carousel.Item as needed */}
      </Carousel>
    </div>
  );
};

export default CustomCarousel;
