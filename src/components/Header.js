import Logo from '../../res/logo.svg'
import { Link } from "react-router-dom";


export function Header() {
    return (
        <>
        <Logo></Logo>
        <div className="header-buttons">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/tetchris">Tetchris</Link></li>
            </ul>
        </div>
        </>
    )
    }