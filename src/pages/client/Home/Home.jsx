import React from "react";
import Navbar from "./Navbar";
import images from "../../../assets/images";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const newDate = new Date();
  const navigate = useNavigate();
  
  return (
    <main>
      <Navbar />

      <section
        className="hero"
        id="home"
        style={{ backgroundImage: `url('${images.hero_bg}')` }}
      >
        <div className="container">
          <div className="hero-content">
            <p className="hero-subtitle">MayTopia Super Foods</p>

            <h2 className="h1 hero-title">
              The most delicious Fast Food dishes and desserts
            </h2>

            <p className="hero-text">
              Food is any substance consumed to provide nutritional support for
              an organism.
            </p>

            <button className="btn" onClick={() => navigate("/menu")}>
              Menu
            </button>
          </div>

          <figure className="hero-banner">
            <img
              src={images.hero_banner_bg}
              width="820"
              height="716"
              alt=""
              aria-hidden="true"
              className="w-100 hero-img-bg"
            />

            <img
              src={images.hero_banner}
              width="700"
              height="637"
              loading="lazy"
              alt="Burger"
              className="w-100 hero-img"
            />
          </figure>
        </div>
      </section>

      <footer className="footer">
        <div
          className="footer-top"
          style={{
            backgroundImage: `url('${images.footer_illustration}')`,
          }}
        >
          <div className="container">
            <div className="footer-brand">
              <Link to={""} className="logo">
                MayTopia<span className="span">.</span>
              </Link>

              <p className="footer-text">
                Financial experts support or help you to to find out which way
                you can raise your funds more.
              </p>

              <ul className="social-list">
                <li>
                  <Link to={""} className="social-link block">
                    <div name="logo-facebook"></div>
                  </Link>
                </li>

                <li>
                  <Link to={""} className="social-link block">
                    <div name="logo-twitter"></div>
                  </Link>
                </li>

                <li>
                  <Link to={""} className="social-link block">
                    <div name="logo-instagram"></div>
                  </Link>
                </li>

                <li>
                  <Link to={""} className="social-link block">
                    <div name="logo-pinterest"></div>
                  </Link>
                </li>
              </ul>
            </div>

            <ul className="footer-list">
              <li>
                <p className="footer-list-title">Contact Info</p>
              </li>

              <li>
                <p className="footer-list-item">+998917894512</p>
              </li>

              <li>
                <p className="footer-list-item">Info@YourGmail24.com</p>
              </li>

              <li>
                <address className="footer-list-item">
                  123, Street Name, City, Country
                </address>
              </li>
            </ul>

            <ul className="footer-list">
              <li>
                <p className="footer-list-title">Opening Hours</p>
              </li>

              <li>
                <p className="footer-list-item">Monday-Friday: 08:00-22:00</p>
              </li>

              <li>
                <p className="footer-list-item">Saturday: 10:00-16:00</p>
              </li>
            </ul>

            <div>
              <h2>For MayTopia Employers</h2>
              <button className="btn">Login</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container">
            <p className="copyright-text">
              &copy; {newDate.getFullYear()}{" "}
              <Link
                to={"https://www.linkedin.com/in/akhatmirzo-umarov-46a998293/"}
                className="copyright-link"
              >
                Akhatmirzo Codes
              </Link>{" "}
              All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
