import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import MapPoint from '../../assets/images/top-block/icons/map-point.svg'
import PriceIcon from '../../assets/images/top-block/icons/price-icon.png'
import User from '../../assets/images/top-block/icons/user.svg'
import MagnifyingGlass from '../../assets/images/top-block/icons/magnifying-glass.svg'
import TopVideo from '../../assets/videos/top-block.mp4'
import GreenArrow from '../../assets/icons/green-arrow.png'
import MapPointHotels from '../../assets/images/hotels/icons/map-point.png'
import MapPointCard from '../../assets/images/hotels/icons/map-point.png'
import Pin from '../../assets/icons/pin.png'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Header from '../PageHeader/Header';
import Footer from '../PageFooter/Footer';
import { Link } from 'react-router-dom';
import './HomePage.scss'



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
    const guestOption = [
        { value: '1', label: '1 guest' },
        { value: '2', label: '2 guests' },
        { value: '3', label: '3 guests' },
        { value: '4', label: '4 guests' }
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
    fetch('http://localhost:8888/graduation/Hotels/getHotels.php')
      .then(response => response.json())
      .then(data => setHotels(data))
        .catch(error => console.error(error));
    }, []);

    const [tours, setTours] = useState([]);
    useEffect(() => {
    fetch('http://localhost:8888/graduation/Tours/getTours.php')
      .then(response => response.json())
      .then(data => setTours(data))
        .catch(error => console.error(error));
    }, []);


    const handlePriceRangeChange = (value) => {
        localStorage.setItem('tourSelectedPriceRange', value)
    };
    const handleCountrySelectChange = (value) => {
        localStorage.setItem('tourSelectedCountrySelect', value.value)
    };
    const handleGuestSelectChange = (value) => {
        localStorage.setItem('tourSelectedGuestSelect', value.value)
    };
    const priceMarks = {
        0: '0$',
        1000: '1000$',
        2000: '2000$',
        3000: '3000$',
        4000: '4000$',
        5000: '5000$',
        6000: '6000$',
    };

    return (
        <>
            <Header currentPage={currentPage} handlePageChange={handlePageChange}/>
            <main className="main">
                <div className="main__top-block top-block">
                    <div className="top-block__container _container">
                        <div className="top-block__body">
                            <h1 className="top-block__title" data-aos="zoom-in">Open new horizons</h1>
                            <form className="top-block__info top-info">
                                <div className="top-info__list">
                                    <div className="top-info__item">
                                        <img src={MapPoint} alt=""/>
                                        <div className="top-info__content">
                                            <label className="top-info__title">Location</label>
                                            <Select options={locationOption} styles={customStyles} onChange={handleCountrySelectChange}/>
                                        </div>
                                    </div>
                                    <div className="top-info__item price-slider">
                                        <img src={PriceIcon} alt=""/>
                                        <div className="top-info__content">
                                            <h3 className="top-info__title">Price</h3>
                                            <Slider
                                                range
                                                min={0}
                                                max={6000}
                                                marks={priceMarks}
                                                step={500}
                                                onChange={handlePriceRangeChange}
                                                defaultValue={[1000, 2000]}
                                            />
                                        </div>
                                    </div>
                                    <div className="top-info__item">
                                        <img src={User} alt=""/>
                                        <div className="top-info__content">
                                            <h3 className="top-info__title">Guests</h3>
                                            <Select options={guestOption} styles={customStyles} onChange={handleGuestSelectChange}/>
                                        </div>
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
                <div className="main__tours tours" data-aos="fade-right" data-aos-duration="1000">
                    <div className="tours__container _container">
                        <div className="tours__title">
                            <h2>Best Tours</h2>
                            <Link to={'/tours'} className="tours-view-all-button view-all-button">
                                <span>View All</span><img src={GreenArrow} alt=""/>
                            </Link>
                        </div>
                        <div className="tours__list">
                            {tours.filter(tour => tour.price > 200)
                                .sort((a, b) => b.price - a.price)
                                .slice(0, 5)
                                .map(tour => (
                                    <div className="tours__item" key={tour.id} data-aos="fade-up" data-aos-duration="1000">
                                <div className="tours__item_photo">
                                    <img className="card-image" src={tour.photo} alt="hotel" />
                                    <a href={tour.link} rel="noreferrer" target='_blank' className="booking">
                                        <p>Click to book tour ticket</p>
                                    </a>
                                    <div className="tours__item_price">{tour.price}$</div>
                                </div>
                                <div className="tours__item_text">
                                    <div className="tours__item_title">{tour.name}</div>
                                    <div className="tours__item_subtitle">
                                        <div className="tours__item_location">
                                            <div className="tours__item_location-item">
                                                <img src={MapPointCard} alt="" />{tour.cityFrom}, {tour.countryFrom}
                                            </div>
                                            <div className="tours__item_location-item">
                                                <img src={Pin} alt="" />{tour.cityFrom}, {tour.countryFrom}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                ))
                            }
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
                        <div className="about-us__image"></div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default HomePage;
