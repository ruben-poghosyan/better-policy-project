import React, { useState } from 'react';
import { Container, Row, Col, Image, Pagination } from 'react-bootstrap';
import './RepeaterSystem.css'


const RepeaterSystem = ({currentItems}) => {

  return (
    <Container fluid>
      <Row className="justify-content-center item-row">
        {currentItems.map((item, index) => (
          <Col key={index} sm={12} md={4} lg={4} className="item-col">
            <div className="item shadow">
              <Image src={item.url} fluid className="item-image" style={{width:"250px", height:"250px", objectFit:"cover"}} />
              <div className="item-info">
                <h3>{item.name}</h3>
                <p>{item.title}</p>
                <p>Level: {item.level}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RepeaterSystem;