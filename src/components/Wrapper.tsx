import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import HomePage from "./HomePage";
import TetchrisPage from "./TetchrisPage";
import "./Wrapper.css";

 function Wrapper() {
  return (
    <div className="site-wrapper">
      <div className="header-wrapper">
        <Header />
      </div>
      <div className="body-wrapper">
      <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tetchris" element={<TetchrisPage />} />
            <Route path="*" element={<p>NOT FOUND</p>}/>
          </Routes>

      </div>
      <div className="footer-wrapper">
        <Footer />
      </div>
    </div>

  );
}

export default Wrapper;