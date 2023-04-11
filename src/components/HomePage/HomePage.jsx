import React from 'react';
import './HomePage.scss'
import Header from '../Header/Header';
import MapPoint from '../../assets/images/top-block/icons/map-point.svg'
import Bike from '../../assets/images/top-block/icons/bike.svg'
import Calendar from '../../assets/images/top-block/icons/calendar.svg'
import User from '../../assets/images/top-block/icons/user.svg'
import MagnifyingGlass from '../../assets/images/top-block/icons/magnifying-glass.svg'
import TopImage from '../../assets/images/top-block/top-block.png'
import PurpleArrow from '../../assets/icons/purple-arrow.svg'
import MapPointHotels from '../../assets/images/hotels/icons/map-point.svg'
import TipsCalendar from '../../assets/images/tips/icons/calendar.svg'
import TipsComm from '../../assets/images/tips/icons/comm.svg'
import TipsUser from '../../assets/images/tips/icons/user.svg'
import Footer from '../Footer/Footer';


const HomePage = () => {
    return (
        <>
            <Header />
            <main className="main">
                <div className="main__top-block top-block">
                    <div className="top-block__container _container">
                        <div className="top-block__body">
                            <h1 className="top-block__title">Open new horizons</h1>
                            <form className="top-block__info top-info">
                                <div className="top-info__item">
                                    <a href="/"><img src={MapPoint} alt=""/></a>
                                    <div className="top-info__content">
                                        <label className="top-info__title">Location</label>
                                        <select className="top-info__select">
                                            <option value="null">Choose Location</option>
                                            <option value="usa">USA</option>
                                            <option value="ua">Ukraine</option>
                                            <option value="fr">France</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="top-info__item">
                                    <a href="/"><img src={Bike}alt=""/></a>
                                    <div className="top-info__content">
                                        <h3 className="top-info__title">Activity</h3>
                                        <select className="top-info__select">
                                            <option value="null">Choose activity</option>
                                            <option value="skiing">Skiing</option>
                                            <option value="climbing">Climbing</option>
                                            <option value="diving">Diving</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="top-info__item">
                                    <a href="/"><img src={Calendar} alt=""/></a>
                                    <div className="top-info__content">
                                        <h3 className="top-info__title">When</h3>
                                        <select className="top-info__select">
                                            <option value="">Choose a Date</option> 
                                        </select>
                                    </div>
                                </div>
                                <div className="top-info__item">
                                    <a href="/"><img src={User} alt=""/></a>
                                    <div className="top-info__content">
                                        <h3 className="top-info__title">Guests</h3>
                                        <select className="top-info__select">
                                            <option value="1">1 guest</option> 
                                            <option value="2-4">2-4 guests</option>
                                            <option value="4+">4+ guests</option>
                                        </select>
                                    </div>
                                </div>
                                <button className="top-info__button dark-btn">
                                    <img src={MagnifyingGlass} alt="search"/>
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="top-block__background _ibg">
                        <img src={TopImage} alt="cover"/>
                    </div>
                </div>
                <div className="main__destinations destinations">
                    <div className="destinations__container _container">
                        <div className="destinations__title">
                            <h2>Popular Destinations</h2>
                            <a href="/" className="destination-view-all-button view-all-button">
                                <span>View All</span><img src={PurpleArrow} alt=""/>
                            </a>
                        </div>
                        <div className="destinations__list">
                            <div className="destinations__item">
                                <img className="card-image" src="./img/destination/destination_1.png" alt=""/>
                                <div className="destinations__item_title">Big Sur</div>
                                <div className="destinations__item_subtitle">California, USA</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main__hotels hotels">
                    <div className="hotels__container _container">
                        <div className="hotels__title">
                            <h2>Hotels and Restaurants</h2>
                            <a href="/" className="hotels-view-all-button view-all-button">
                                <span>View All</span><img src={PurpleArrow} alt=""/>
                            </a>
                        </div>
                        <div className="hotels__list">
                            <div className="hotels__item hotels__salerno">
                                <img className="card-image" src="./img/hotels/hotels_1.png" alt="hotel"/>
                                <div className="hotels__item_title">Monastero Santa Rosa Hotel & Spa</div>
                                <div className="hotels__item_subtitle">
                                    <div className="hotels__item_text">
                                        <img src={MapPointHotels} alt=""/>Salerno, Italy
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main__tips tips">
                    <div className="tips__container _container">
                        <div className="tips__title">
                            <h2>Travel Tips and Advice</h2>
                            <a href="/" className="tips-view-all-button view-all-button">
                                <span>View All</span><img src={PurpleArrow} alt=""/>
                            </a>
                        </div>
                        <div className="tips__list">
                            <div className="tips__item">
                                <img className="card-image" src="./img/tips/tips_1.png" alt="tip"/>
                                <div className="tips__content">
                                    <div className="tips__content_title">East Village Ice Cream Crawl</div>
                                    <div className="tips__content_text">We will stop at five different world-class ice cream shops on this 1.5 mile 1.5 hour tour. At each ice cream store we'll
                                    explore the story behind the business and see what makes the ice cream unique as you savor every…</div>
                                    <div className="tips__content_info">
                                        <span><img src={TipsCalendar} alt=""/>Today</span>
                                        <span><img src={TipsUser} alt=""/>Maria Philips</span>
                                        <span><img src={TipsComm} alt=""/>2</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main__activities activities">
                    <div className="activities__container _container">
                        <div className="activities__title">
                            <h2>Activities</h2>
                            <a href="/" className="activities-view-all-button view-all-button">
                                <span>View All</span><img src={PurpleArrow} alt=""/>
                            </a>
                        </div>
                        <div className="activities__list">
                            <div className="activities__item">
                                <img className="card-image" src="./img/activities//activities_1.png" alt=""/>/
                                <span>Sailing</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main__about-us about-us">
                    <div className="about-us__container _container">
                        <div className="about-us__content">
                            <h3 className="about-us__title">About Us</h3>
                            <div className="about-us__text">Our company offers a wide range of services, from route selection and ticket booking to an organization of excursions,
                            accommodation, and transportation. Our team consists of experienced travel experts who are ready to help you at any time
                            to make your trip comfortable, safe, and unforgettable.</div>
                            <a href="/" className="about-us_button">
                                <span>Read More</span><img src={PurpleArrow} alt=""/>
                            </a>
                        </div>
                        <div className="about-us__image">
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default HomePage;
