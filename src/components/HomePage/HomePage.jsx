import React, { useState, useEffect } from 'react';
import './HomePage.scss'
import Header from '../PageHeader/Header';
import Select from 'react-select';
import MapPoint from '../../assets/images/top-block/icons/map-point.svg'
import Bike from '../../assets/images/top-block/icons/bike.svg'
import Calendar from '../../assets/images/top-block/icons/calendar.svg'
import User from '../../assets/images/top-block/icons/user.svg'
import MagnifyingGlass from '../../assets/images/top-block/icons/magnifying-glass.svg'
import TopVideo from '../../assets/videos/top-block.mp4'
import GreenArrow from '../../assets/icons/green-arrow.png'
import MapPointHotels from '../../assets/images/hotels/icons/map-point.png'
import Footer from '../PageFooter/Footer';
import { Link } from 'react-router-dom';



const HomePage = () => {
    const [currentPage, setCurrentPage] = useState('home');

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const locationOption = [
        { value: 'usa', label: 'USA' },
        { value: 'ua', label: 'Ukraine' },
        { value: 'fr', label: 'France' }
    ];
    const activityOption = [
        { value: 'skiing', label: 'Skiing' },
        { value: 'climbing', label: 'Climbing' },
        { value: 'diving', label: 'Diving' }
    ];
    const guestOption = [
        { value: '1', label: '1 guest' },
        { value: '2-4', label: '2-4 guests' },
        { value: '4+', label: '4+ guests' }
    ];
    const customStyles = {
        control: (provided) => ({
            ...provided,
            border: 'none',
            boxShadow: 'none',
        }),
        option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? '#fff' : '#161414',
            fontWeight: 500,
            backgroundColor: state.isSelected ? '#26bd20' : 'white',
        }),
        singleValue: (provided) => ({
            ...provided,
        }),
        indicatorSeparator: () => ({
            display: 'none',
        }),
        valueContainer: (provided) => ({
            ...provided,
            padding: 0,
            margin: 0,
        }),
        input: (styles) => ({
            ...styles,
            margin: 0,
        }),
        placeholder: (styles) => ({
            ...styles,
            margin: 0,
        }),
    };

    const [hotels, setHotels] = useState([]);
    
    useEffect(() => {
    fetch('http://localhost:8888/graduation/getHotels.php')
      .then(response => response.json())
      .then(data => setHotels(data))
        .catch(error => console.error(error));
    }, []);
    return (
        <>
            <Header currentPage={currentPage} handlePageChange={handlePageChange}/>
            <main className="main">
                <div className="main__top-block top-block">
                    <div className="top-block__container _container">
                        <div className="top-block__body">
                            <h1 className="top-block__title" data-aos="zoom-in">Open new horizons</h1>
                            <form className="top-block__info top-info">
                                <div className="top-info__item">
                                    <a href="/"><img src={MapPoint} alt=""/></a>
                                    <div className="top-info__content">
                                        <label className="top-info__title">Location</label>
                                        <Select options={locationOption} styles={customStyles} />
                                    </div>
                                </div>
                                <div className="top-info__item">
                                    <a href="/"><img src={Bike}alt=""/></a>
                                    <div className="top-info__content">
                                        <h3 className="top-info__title">Activity</h3>
                                        <Select options={activityOption} styles={customStyles} />
                                    </div>
                                </div>
                                <div className="top-info__item">
                                    <a href="/"><img src={Calendar} alt=""/></a>
                                    <div className="top-info__content">
                                        <h3 className="top-info__title">When</h3>
                                    </div>
                                </div>
                                <div className="top-info__item">
                                    <a href="/"><img src={User} alt=""/></a>
                                    <div className="top-info__content">
                                        <h3 className="top-info__title">Guests</h3>
                                        <Select options={guestOption} styles={customStyles} />
                                    </div>
                                </div>
                                <div className="top-info__button dark-btn">
                                    <img src={MagnifyingGlass} alt="search"/>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="top-block__background">
                        <video src={TopVideo} autoPlay playsInline loop muted></video>
                    </div>
                </div>
                <div className="main__destinations destinations" data-aos="fade-right" data-aos-duration="1000">
                    <div className="destinations__container _container">
                        <div className="destinations__title">
                            <h2>Popular Destinations</h2>
                            <a href="/" className="destination-view-all-button view-all-button">
                                <span>View All</span><img src={GreenArrow} alt=""/>
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
                <div className="main__hotels hotels" data-aos="fade-left" data-aos-duration="1000">
                    <div className="hotels__container _container">
                        <div className="hotels__title">
                            <h2>Best Hotels</h2>
                            <Link to={'/hotels'} className="hotels-view-all-button view-all-button">
                                <span>View All</span><img src={GreenArrow} alt=""/>
                            </Link>
                        </div>
                        <div className="hotels__list">
                            {hotels.filter(hotel => hotel.mark > 8.9)
                                .sort((a, b) => b.mark - a.mark)
                                .slice(0, 5)
                                .map(hotel => (
                                    <div className="hotels__item" key={hotel.id}>
                                        <div className="hotels__item_photo">
                                            <img className="card-image" src={hotel.photo} alt="hotel" />
                                            <a href={hotel.link} rel="noreferrer" target='_blank' className="booking">
                                                <p>Click to book hotel room</p>
                                            </a>
                                            <div className="hotels__item_mark">{hotel.mark}</div>
                                        </div>
                                        <div className="hotels__item_text">
                                            <div className="hotels__item_title">{hotel.name}</div>
                                            <div className="hotels__item_subtitle">
                                                <div className="hotels__item_location">
                                                    <img src={MapPointHotels} alt=""/>{hotel.city}, {hotel.country}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="main__activities activities" data-aos="fade-right" data-aos-duration="1000">
                    <div className="activities__container _container">
                        <div className="activities__title">
                            <h2>Activities</h2>
                            <a href="/" className="activities-view-all-button view-all-button">
                                <span>View All</span><img src={GreenArrow} alt=""/>
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
                <div className="main__about-us about-us" data-aos="fade-left" data-aos-duration="1000">
                    <div className="about-us__container _container">
                        <div className="about-us__content">
                            <h3 className="about-us__title">About Us</h3>
                            <div className="about-us__text">Our company offers a wide range of services, from route selection and ticket booking to an organization of excursions,
                            accommodation, and transportation. Our team consists of experienced travel experts who are ready to help you at any time
                            to make your trip comfortable, safe, and unforgettable.</div>
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
