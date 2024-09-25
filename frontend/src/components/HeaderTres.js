import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../styles.css';

/* import appFirebase from '../assets/credenciales';
import { getAuth, signOut } from 'firebase/auth';
const auth = getAuth(appFirebase)
 */
//const Header = ({ loggedIn, setLoggedIn }) => {
const Header = () => {
    //console.log("loggedIn: header ", loggedIn)
    const [menuOpen, setMenuOpen] = useState(false);
    /*
    const close = () => {
        signOut(auth).then(() => {
            setLoggedIn(false);
        }).catch((error) => {
            console.error("Error signing out: ", error);
        });
    }; */
    return (
        <header className="navbar navbar-dark px-5 custom-bg">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <Link to="/">
                    <img src="/NodeBanner.png" alt="Logop" style={{ maxWidth: '200px', height: 'auto' }} />
                </Link>

                {/* Botones en pantallas grandes */}
                {/* <div className="d-none d-md-flex ms-auto">
                <a
                        href="http://localhost:3002/red/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav-link btn btn-custom text-white px-4 py-2 rounded me-3 fw-bold"
                    >
                        Node-Red
                    </a>
                    <NavLink to="/login" className="nav-link btn btn-custom text-white px-4 py-2 rounded fw-bold">
                        Monitor
                    </NavLink>
                </div> */}

                {/* Botón de menú hamburguesa para pantallas pequeñas */}
                {/* <button
                    className="navbar-toggler d-md-none"
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button> */}
            </div>

            {/* Menú hamburguesa en pantallas pequeñas */}
            {/* {menuOpen && (
                <nav className="navbar navbar-expand-md navbar-dark d-md-none">
                    <div className="collapse navbar-collapse show">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <NavLink to="/registro" className="nav-link text-white px-4 py-2 ">
                                    Node-Red
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/login" className="nav-link text-white px-4 py-2">
                                    Monitoreo
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            )} */}
        </header>
    );
};

export default Header;