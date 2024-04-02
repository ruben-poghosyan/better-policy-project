import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
const Footer = () => {
    return (
        <div className="container">
  <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <div className="col-md-4 d-flex align-items-center">
      <a href="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
        <svg className="bi" width="30" height="24"></svg>
      </a>
      <span className="mb-3 mb-md-0 text-body-secondary">&copy; 2024 Company, Inc</span>
    </div>

    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
      <li className="ms-3"><a className="text-body-secondary" href="#"><i className="bi bi-linkedin" style={{"fontSize":"1.5rem"}}></i></a></li>
      <li className="ms-3"><a className="text-body-secondary" href="#"><i className="bi bi-twitter" style={{"fontSize":"1.5rem"}}></i></a></li>
      <li className="ms-3"><a className="text-body-secondary" href="#"><i className="bi bi-youtube" style={{"fontSize":"1.5rem"}}></i></a></li>
    </ul>
  </footer>
</div>
    )
}

export default Footer