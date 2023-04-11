import React, { useState } from 'react';
import './Header.scss'

const Header = () => {
    const [showBurger, setShowBurger] = useState(false);


    return (
        <header className={!showBurger ? "header" : "header open"}>
            <div className="header__container _container">
                <a href="/" className="header__logo">
                    Adventurize
                </a>
                {showBurger ? (
                    <button className="header__burger" id="burger" onClick={() => setShowBurger(false)}>
                        <span></span><span></span><span></span>
                    </button> 
                ) : (
                    <button className="header__burger" id="burger" onClick={() => setShowBurger(true)}>
                        <span></span><span></span><span></span>
                    </button>  
                )}
                
                <nav className="header__menu menu">
                    <ul className="menu__list">
                        <li className="menu__item">
                            <a href="/" className="menu__link menu__link_active">Home</a>
                        </li>
                        <li className="menu__item">
                            <a href="/" className="menu__link">Hotels</a>
                        </li>
                        <li className="menu__item">
                            <a href="/" className="menu__link">Tours</a>
                        </li>
                        <li className="menu__item">
                            <a href="/" className="menu__link">Destinations</a>
                        </li>
                        <li className="menu__item">
                            <a href="/" className="menu__link">Activities</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
