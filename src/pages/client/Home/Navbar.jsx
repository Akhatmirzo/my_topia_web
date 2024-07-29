import React from 'react'
import "./style.css"
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate()
  return (
    <header className="header" data-header>
    <div className="container">

      <h1>
        <Link to={""} className="logo">MayTopia<span className="span">.</span></Link>
      </h1>

      {/* <nav className="navbar" data-navbar>
        <ul className="navbar-list">

          <li className="nav-item">
            <Link to="#home" className="navbar-link">Home</Link>
          </li>

          <li className="nav-item">
            <Link to="#about" className="navbar-link">About Us</Link>
          </li>

          <li className="nav-item">
            <Link to="#food-menu" className="navbar-link">Shop</Link>
          </li>

          <li className="nav-item">
            <Link to="#blog" className="navbar-link">Blog</Link>
          </li>

          <li className="nav-item">
            <Link to={""} className="navbar-link">Contact Us</Link>
          </li>

        </ul>
      </nav> */}

      <div className="header-btn-group">
        <button className="btn btn-hover" onClick={() => navigate('/menu')}>Menu</button>

        {/* <button className="nav-toggle-btn" aria-label="Toggle Menu">
          <span className="line top"></span>
          <span className="line middle"></span>
          <span className="line bottom"></span>
        </button> */}
      </div>

    </div>
  </header>
  )
}
