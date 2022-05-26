import { Header } from "./Header";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";


export default function App() {
  return (
    <div className="site-wrapper">
      <div className="header-wrapper">
        <Header />
      </div>
      <div className="body-wrapper">
        <Outlet/>
      </div>
      <div className="footer-wrapper">
        <Footer />
      </div>
    </div>

  );
}
