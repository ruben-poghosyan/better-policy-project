import Spinner from 'react-bootstrap/Spinner';
import './centeredspinner.css';
import React from 'react';
const Loading = () => {
    return (<div className='myspinner'><Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner></div>)
}

export default Loading;
