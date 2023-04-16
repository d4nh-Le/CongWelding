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
					<div className="footer-link"> Our Company </div>
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
					<h2>Services</h2>
					<div className="footer-link"> What We Do </div>
					<div className="footer-link"> Our Products </div>
					<div className="footer-link"> Our Services </div>
				</div>
				<div className="column">
					<h2>Account</h2>
					<div className="footer-link"> Login </div>
					<div className="footer-link"> Register </div>
				</div>
				<div className="column">
					<h2>Social Media</h2>
					<div className="footer-link"> Facebook </div>
					<div className="footer-link"> Instagram </div>
				</div>
			</div>
			<h3>{`Copyright © Cong Welding ${year}`}</h3>
		</footer>
	);	
  };
  
  export default Footer;