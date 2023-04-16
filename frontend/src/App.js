import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import Navbar from './components/navbar';
import Navbar2 from './components/navbar-second';
import Footer from './components/footer';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Cart from './pages/Cart';
import Signup from './pages/signup';
import WeldingProducts from './pages/products';
import Contact from './pages/contact';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Navbar2 />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<WeldingProducts />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;