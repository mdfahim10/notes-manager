import "../styles/Navbar.css"
import { Link } from "react-router-dom";

export default function Navbar(){

    return (
        <nav className="navbar">
            <div className="logo">Notes</div>
            <ul className="nav-link">
                <li>
                    <Link to={"/"}>All Notes</Link>
                </li>
                <li>
                    <Link to={"/add"}>Add Notes</Link>
                </li>
            </ul>
        </nav>
    )
}