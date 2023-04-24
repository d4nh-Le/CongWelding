import { Link } from "react-router-dom";
import logo from '../../data/icon.png';
import './navbar.css';

const Navbar = () => {

  return   (
    <nav className="navbar">
      <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        
        <div className="title-container">
          <h1 className="title">Product admin </h1>
        </div>
      </div>
      <div className="button-container">
        
        <div className="add-button-container">
          <Link to="/products/new">
          <button className="add-item-btn">
            Add New Item
          </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;