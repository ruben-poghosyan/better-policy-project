import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './RepeaterSystem.css'


const RepeaterSystem = ({currentItems}) => {

  return (
<Container fluid>
  <Row className="item-row justify-content-center" >
    {currentItems.map((item, index) => (
      <Col key={index} sm={6} md={6} lg={4} className="item-col d-flex justify-content-center">
        <div className="item shadow" onClick={item.clickHandler}>
          <Image src={item.url} fluid className="item-image" style={{width:"250px", height:"250px", objectFit:"cover"}} />
          <div className="item-info">
            <h3>{item.name}</h3>
            <p>{item.title}</p>
            {item.level ? <p>Level: {item.level}</p> : <></>}
          </div>
        </div>
      </Col>
    ))}
  </Row>
</Container>


  );
};

export default RepeaterSystem;