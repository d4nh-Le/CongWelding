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
import Orderpage from './pages/orderpage';
import Orderhistory from './pages/orderhistory';
import Contact from './pages/contact';
import Contactinfo from './pages/contactinfo';
import Frequentlyaskedquestions from './pages/frequentlyaskedquestions';
import Ourcompany from './pages/ourcompany';
import AccountInfo from './pages/userdetails';
import { AuthProvider } from './AuthContext';
//UPDATED WORKING CODE
function App() {
  return (
    <AuthProvider>
    <div className="App">
      <Router>
        <Navbar />
        <Navbar2 />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<WeldingProducts />} />
          <Route path="/order" element={<Orderpage />} />
          <Route path="/orderhistory" element={<Orderhistory />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contactinfo" element={<Contactinfo />} />
          <Route path="/faq" element={<Frequentlyaskedquestions />} />
          <Route path="/ourcompany" element={<Ourcompany />} />
          <Route path="/userdetails" element={<AccountInfo />} />
        </Routes>
        <Footer />
      </Router>
    </div>
    </AuthProvider>
  );
}

export default App;
