import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
const Home = () => {
    return (
        <Carousel>
          <Carousel.Item style={{maxHeight:"80dvh"}} >
          <img style={{height:"100%", objectFit:"cover"}}
            className="d-block w-100"
src="https://i.ytimg.com/vi/RLm6Im2N4Xw/maxresdefault.jpg"
            alt="Image One"
          /> 
            <Carousel.Caption className='d-none d-md-block'>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item style={{maxHeight:"80dvh"}} >
          <img style={{height:"100%", objectFit:"cover"}}
            className="d-block w-100"
src="https://i.ytimg.com/vi/RDQTrloa2DQ/maxresdefault.jpg"
            alt="Image Two"
          /> 
            <Carousel.Caption className='d-none d-md-block'>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item style={{"maxHeight": "80dvh"}}>
          <img style={{height:"100%", objectFit:"cover"}}
            className="d-block w-100"
src="https://i.ytimg.com/vi/ObwCZ0KL_UI/maxresdefault.jpg"
            alt="Image Two"
          /> 
            <Carousel.Caption className='d-none d-md-block'>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      )
}

export default Home