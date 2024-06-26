import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
const Footer = ({socialMediaArray}) => {
    return (
        <div className="container">
  <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <div className="col-md-4 d-flex align-items-center">
      <span className="mb-3 mb-md-0 text-body-secondary">&copy; 2024 Global Forecasting School</span>
    </div>

    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
     {socialMediaArray.map((item)=> <li key={item.id} className="ms-3"><a className="text-body-secondary" target="_blank" href={item.url}><i className={"bi bi-"+ item.media} style={{"fontSize":"1.5rem"}}></i></a></li>)}
      
    </ul>
  </footer>
</div>
    )
}

export default Footer