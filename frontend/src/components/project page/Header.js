import React from "react";
import { Link } from "react-router-dom";



function Header() {
  return (
	<div className="header border">
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="https://inzint.com">
<img src="https://inzint.com/wp-content/uploads/2022/09/inzint-logo-dark.png" width="80px"/></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <a className="nav-link"  href="#">Calender</a>
        <Link className="nav-link active" to = {{pathname: "//localhost:3000/dev/login"}} target="_blank">Project</Link>
        <a className="nav-link" href="/client">Client</a>
      </div>
    </div>
  </div>
</nav> 
</div>
);
}

export default Header;
