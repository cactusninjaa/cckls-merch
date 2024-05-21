import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Merch from "./pages/merch";
import NotFound from "./pages/notFound"; 
import About from "./pages/about";
import Cart from "./pages/cart";
import Product from "./pages/product";
import Checkout from "./pages/checkout";

import Header from "./containers/header";
import Footer from "./containers/footer";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/merch" element={<Merch />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="*" element={<NotFound />} /> Route 404
      </Routes>
      <Footer />
    </Router>
  );
}