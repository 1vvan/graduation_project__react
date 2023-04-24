import React from 'react';
import ArrowIcon from '../../assets/images/footer/icons/arrow.svg'
import { Link } from 'react-router-dom';
import './Footer.scss'


const Footer = () => {

    return (
        <footer className="footer">
            <div className="footer__container _container">
                <div className="footer__info">
                    <a href="/" className="footer__logo">Adventurize</a>
                    <div className="footer__info_subtitle">We believe that travel is not just a vacation, but an opportunity to expand your horizons and gain new life experience.</div>
                </div>
                <div className="footer__main down-info">
                    <div className="footer__main_item down-info__item">
                        <div className="down-info__title">Navigate</div>
                        <div className="down-info__links">
                            <Link to={'/hotels'} className="down-info__link">Hotels</Link>
                            <Link to={'/tours'} className="down-info__link">Tours</Link>
                            <Link to={'/company'} className="down-info__link">Company</Link>
                        </div>
                    </div>
                    <div className="footer__main_item down-info__item">
                        <div className="down-info__title">Company</div>
                        <div className="down-info__links">
                            <Link to={'/company'} className="down-info__link">Our mission</Link>
                            <Link to={'/company'} className="down-info__link">Team</Link>
                            <Link to={'/company'} className="down-info__link">Our rewards</Link>
                        </div>
                    </div>
                </div>
                <div className="footer__subscribe footer-email">
                    <div className="footer-email__title">Write your review about our services</div>
                    <div className="footer-email__fill">
                        <Link to={'/company'} className="footer-form__button dark-btn">
                            Go to review adding form<img src={ArrowIcon} alt="" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
