import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import './carousel.css'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
const CustomCarousel = ({elementsArray}) => {
  return (
    <div className="parent">
      <Swiper autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }} pagination={{dynamicBullets: true,}} navigation={true} modules={[Autoplay, Navigation, Pagination]} className=" child">
        {elementsArray.map((data) => 
        <SwiperSlide key={data.id}>
          <div className="swiper-image-container" onClick={() => {window.open(data.attributes.url, "_blank")}}>
            <img src={data.attributes.Thumbnail}></img>
            <div className="overlay">
              <div className="overlay-text">{data.attributes.Title}</div>
            </div> {/* Overlay */}
          </div>
        </SwiperSlide>)}
      </Swiper>
    </div>
  );
};

export default CustomCarousel;
