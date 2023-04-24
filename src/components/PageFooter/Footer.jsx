import React from 'react';
import './Footer.scss'
import EmailIcon from '../../assets/images/footer/icons/email.svg'
import ArrowIcon from '../../assets/images/footer/icons/arrow.svg'

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
                        <div className="down-info__title">About</div>
                        <div className="down-info__links">
                            <a href="/" className="down-info__link">About Us</a>
                            <a href="/" className="down-info__link">Features</a>
                            <a href="/" className="down-info__link">News</a>
                            <a href="/" className="down-info__link">Menu</a>
                        </div>
                    </div>
                    <div className="footer__main_item down-info__item">
                        <div className="down-info__title">Company</div>
                        <div className="down-info__links">
                            <a href="/" className="down-info__link">Why Adventurize</a>
                            <a href="/" className="down-info__link">Partner With Us</a>
                            <a href="/" className="down-info__link">FAQ</a>
                            <a href="/" className="down-info__link">Blog</a>
                        </div>
                    </div>
                    <div className="footer__main_item down-info__item">
                        <div className="down-info__title">Support</div>
                        <div className="down-info__links">
                            <a href="/" className="down-info__link">Account</a>
                            <a href="/" className="down-info__link">Support Center</a>
                            <a href="/" className="down-info__link">Feedback</a>
                            <a href="/" className="down-info__link">Contact Us</a>
                        </div>
                    </div>
                </div>
                <div className="footer__subscribe footer-email">
                    <div className="footer-email__title">Subscribe on our destination review newsletters</div>
                    <div className="footer-email__fill">
                        <form action="" className="footer-email__fill_form footer-form">
                            <img src={EmailIcon} alt=""/>
                            <input type="email" className="footer-form__input" placeholder="Your Email"/>
                        </form>
                        <div className="footer-form__button dark-btn">
                            <img src={ArrowIcon} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
