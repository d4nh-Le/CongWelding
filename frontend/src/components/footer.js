import React from "react";
import './footer.css';

const Footer = () => {
	const year = new Date().getFullYear();
  
	return (
		<footer>
			<div className="footer-columns">
				<div className="column">
					<h2>About Us</h2>
					<div className="footer-link"> Our Company </div>
					<div className="footer-link"> FAQ </div>
				</div>
				<div className="column">
					<h2>Contact Us</h2>
					<div className="footer-link"> Contact Information </div>
					<div className="footer-link"> Location </div>
					<div className="footer-link"> Hours </div>
				</div>
				<div className="column">
					<h2>Services</h2>
					<div className="footer-link"> What We Do </div>
					<div className="footer-link"> Our Products </div>
					<div className="footer-link"> Contact Us </div>
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