import React from "react";
import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => {
	const year = new Date().getFullYear();
  
	return (
		<footer>
			<div className="footer-columns">
				<div className="column">
					<h2>About Us</h2>
					<div className="footer-link"> 
					<Link to="/ourcompany" style={{ textDecoration: 'none', color: 'white'}}> Our Company </Link>
					</div>
					<div className="footer-link"> 
					<Link to="/ourcompany" style={{ textDecoration: 'none', color: 'white'}}> What We Do </Link>
					</div>
					<div className="footer-link"> 
					<Link to="/faq" style={{ textDecoration: 'none', color: 'white'}}> FAQ </Link>
					</div>
				</div>
				<div className="column">
					<h2>Contact Us</h2>
					<div className="footer-link"> 
					<Link to="/contact" style={{ textDecoration: 'none', color: 'white'}}> Contact Us </Link>
					</div>
					<div className="footer-link"> 
					<Link to="/contactinfo" style={{ textDecoration: 'none', color: 'white'}}> Contact Information </Link>
					</div>
					<div className="footer-link"> 
					<Link to="/contactinfo" style={{ textDecoration: 'none', color: 'white'}}> Location & Hours </Link>
					</div>
				</div>
				<div className="column">
					<h2>Products & Services</h2>
					<div className="footer-link"> 
					<Link to="/products" style={{ textDecoration: 'none', color: 'white'}}> Our Products </Link>
					</div>
					<div className="footer-link"> 
					<Link to="/products" style={{ textDecoration: 'none', color: 'white'}}> Our Services </Link>
					</div>
				</div>
				<div className="column">
					<h2>Account</h2>
					<div className="footer-link"> Login </div>
					<div className="footer-link"> 
					<Link to="/signup" style={{ textDecoration: 'none', color: 'white'}}> Register </Link>
					</div>
				</div>
			</div>
			<h3>{`Copyright © Cong Welding ${year}`}</h3>
		</footer>
	);	
  };
  
  export default Footer;