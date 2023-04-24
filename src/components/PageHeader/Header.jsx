import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss'

const Header = ({currentPage, handlePageChange}) => {
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
                            <a href="/" className={currentPage === 'home' ? 'menu__link_active' : 'menu__link'} onClick={() => handlePageChange('home')}>Home</a>
                        </li>
                        <li className="menu__item">
                            <Link to={'/hotels'} className={currentPage === 'hotels' ? 'menu__link_active' : 'menu__link'} onClick={() => handlePageChange('hotels')}>Hotels</Link>
                        </li>
                        <li className="menu__item">
                            <Link to={'/tours'} className={currentPage === 'tours' ? 'menu__link_active' : 'menu__link'} onClick={() => handlePageChange('tours')}>Tours</Link>
                        </li>
                        <li className="menu__item">
                            <Link to={'/company'} className={currentPage === 'сompany' ? 'menu__link_active' : 'menu__link'} onClick={() => handlePageChange('company')}>Company</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
