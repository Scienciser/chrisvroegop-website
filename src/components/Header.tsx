import Logo from '../assets/logo.svg?raw'
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <>
      <div dangerouslySetInnerHTML={{__html: Logo}} />
      <div className="header-buttons">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/tetchris">Tetchris</Link></li>
        </ul>
      </div>
    </>
  )
}

export default Header;
