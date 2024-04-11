import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
const ScrollAwareNavbar=()=> {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
  
    useEffect(() => {
      const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
        setPrevScrollPos(currentScrollPos);
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos, visible]);

    return (    
        <Navbar className="shadow" bg="light" expand="lg" fixed="top" style={{ transition: 'top 0.6s', top: visible ? '0' : '-100px' }}>
            <Container>
                <Navbar.Brand href="#">Global Forecasting School</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto"> 
                        <Nav.Link className='custom-navlink' as={Link} to="/">Home</Nav.Link>
                        <Nav.Link className='custom-navlink' as={Link} to="/students">Students</Nav.Link>
                        <Nav.Link className='custom-navlink' as={Link} to="/charts">Charts</Nav.Link>
                        <Nav.Link className='custom-navlink' as={Link} to="/about">About</Nav.Link>
                    </Nav>  
                    <div className="d-lg-flex col-lg-3 justify-content-lg-end">
                        <button className="btn btn-primary" style={{marginRight:"10px"}}>Register</button>
                        <button className="btn btn-light">Login</button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default ScrollAwareNavbar;