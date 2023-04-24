import React, { useEffect, useState } from 'react';
import MapPointCard from '../../assets/images/hotels/icons/map-point.png'
import Pin from '../../assets/icons/pin.png'
import Select from 'react-select';
import MapPoint from '../../assets/images/top-block/icons/map-point.png'
import SortIcon from '../../assets/icons/sort.png'
import PeopleIcon from '../../assets/icons/people.png'
import ReloadIcon from '../../assets/icons/reload.png'
import CheckIcon from '../../assets/icons/check.png'
import ToursBackground from '../../assets/videos/tours_bg.mp4'
import ArrowDown from '../../assets/icons/arrow-down-sign-to-navigate.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../PageHeader/Header';
import Footer from '../PageFooter/Footer';
import './ToursList.scss'

const ToursList = () => {

    const [currentPage, setCurrentPage] = useState('tours');
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    
    const [tours, setTours] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8888/graduation/Tours/getTours.php')
            .then(response => response.json())
            .then(data => setTours(data))
            .catch(error => console.error(error));
    }, []);


    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedSortType, setSelectedSortType] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const handleReloadHotels = () => {
        fetch('http://localhost:8888/graduation/Tours/getTours.php')
        .then(response => response.json())
        .then(data => setTours(data))
            .catch(error => console.error(error));
        setSelectedCountry('')
        setSelectedSortType('')
        setSearchQuery('')
        toast.success('All tours are displayed');
    }


    const locationOption = [
        { value: 'usa', label: 'USA' },
        { value: 'ua', label: 'Ukraine' },
        { value: 'fr', label: 'France' }
    ];
    const sortOption = [
        { value: 'price', label: 'By Price' },
        { value: 'countryFrom', label: 'By Started Country' },
        { value: 'cityFrom', label: 'By Started City' }
    ];
    const guestOption = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' }
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

    const handleCountryChange = (selectedOption) => {
        setSelectedCountry(selectedOption)
        fetch(`http://localhost:8888/graduation/Tours/getTours.php`)
        .then(response => response.json())
        .then(data => setTours((data.filter(hotel => hotel.countryFrom.includes(selectedOption.label)))))
        .catch(error => console.error(error));
        toast.success('Tours are sorted by the location');
    }

    const handleSortChange = (selectedSort) => {
        setSelectedSortType(selectedSort)
        console.log(selectedSortType);
            let sortedTours = tours;
            if (selectedSort.value === 'price') {
                // сортировка по оценке
                sortedTours = tours.sort((a, b) => b.price - a.price);
                setTours(sortedTours);
                toast.success('Tours are sorted by price');
            } else if (selectedSort.value === 'countryFrom') {
                // сортировка по стране
                sortedTours = tours.sort((a, b) => {
                if (a.countryFrom < b.countryFrom) {
                    return -1;
                }
                if (a.countryFrom > b.countryFrom) {
                    return 1;
                }
                return 0;
                });
                setTours(sortedTours);
                toast.success('Tours are sorted by country');
            } else if (selectedSort.value === 'cityFrom') {
                // сортировка по городу
                sortedTours = tours.sort((a, b) => {
                if (a.cityFrom < b.cityFrom) {
                    return -1;
                }
                if (a.cityFrom > b.cityFrom) {
                    return 1;
                }
                return 0;
                });
                setTours(sortedTours);
                toast.success('Tours are sorted by city');
            }
    }

    const [selectedPeopleCount, setSelectedPeolpeCount] = useState(1);

    const handlePeopleChange = (selectedOption) => {
        setSelectedPeolpeCount(selectedOption.value);
        console.log(selectedPeopleCount);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const filteredTours = tours.filter((tours) => {
            const query = searchQuery.toLowerCase();
            const name = tours.name.toLowerCase();
            const city = tours.cityFrom.toLowerCase();
            const country = tours.countryFrom.toLowerCase();
            return name.includes(query) || country.includes(query) || city.includes(query);
        });
        if (searchQuery.length === 0) {
            toast.error('Please enter a search query');
        } else if (filteredTours.length === 0) {
            toast.error('Tours are not found');
            setSearchQuery('')
        } else {
            setTours(filteredTours);
            toast.success('Tours are found'); 
        }
    };


    const selectedFilteredOnMainGuests = localStorage.getItem('tourSelectedGuestSelect');
    const selectedFilteredOnMainPriceRange = localStorage.getItem('tourSelectedPriceRange');
    const selectedFilteredOnMainCountry = localStorage.getItem('tourSelectedCountrySelect');
    const [filteredOnMainTours, setFilteredOnMainTours] = useState([]);

    // Filter tours based on selected filters
    useEffect(() => {
        const filterToursFromMainPageForm = () => {
            const filteredTours = tours.filter(tour => {
                if (selectedFilteredOnMainPriceRange) {
                    const [minPrice, maxPrice] = selectedFilteredOnMainPriceRange.split(',');
                    if (tour.price < parseInt(minPrice) || tour.price > parseInt(maxPrice)) {
                        return false;
                    }
                }
                if (selectedFilteredOnMainCountry && tour.countryFrom !== selectedFilteredOnMainCountry) {
                    return false;
                }
                else {
                    return true;
                }
            });
            setFilteredOnMainTours(filteredTours);
        }
        filterToursFromMainPageForm();
    }, [selectedFilteredOnMainPriceRange, selectedFilteredOnMainCountry, tours]);
    

        

    return (
        <>
            <ToastContainer
                autoClose={3000}
            />
            <Header currentPage={currentPage} handlePageChange={handlePageChange} />
            <div className="main__top-block top-block">
                    <div className="top-block__container _container">
                        <div className="top-block__body">
                            <h1 className="top-block__title" data-aos="zoom-in">Choose the most exciting tour</h1>
                            <div className="top-block__info top-info">
                                <div className="top-info__list">
                                    <div className="top-info__item">
                                        <img src={MapPoint} alt=""/>
                                        <div className="top-info__content">
                                            <label className="top-info__title">Location</label>
                                            <Select options={locationOption} styles={customStyles} value={selectedCountry} onChange={handleCountryChange}/>
                                        </div>
                                    </div>
                                    <div className="top-info__item">
                                        <img src={SortIcon} alt=""/>
                                        <div className="top-info__content">
                                            <label className="top-info__title">Sort</label>
                                            <Select options={sortOption} styles={customStyles} value={selectedSortType} onChange={handleSortChange}/>
                                        </div>
                                    </div>
                                    <div className="top-info__item">
                                        <img src={PeopleIcon} alt=""/>
                                        <div className="top-info__content">
                                            <label className="top-info__title">People Count</label>
                                            <Select options={guestOption} styles={customStyles} onChange={handlePeopleChange}/>
                                        </div>
                                    </div>
                                    <form className='top-info__search' onSubmit={handleSearchSubmit}>
                                        <input
                                        type="text"
                                        name='search'
                                        value={searchQuery}
                                        placeholder='Enter a request'
                                        onChange={(event) => setSearchQuery(event.target.value)}
                                        />
                                        <button type="submit"><img src={CheckIcon} alt="" /></button>
                                    </form>
                                </div>
                                <div className="top-info__button dark-btn">
                                    <img src={ReloadIcon} alt="search"  onClick={handleReloadHotels}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="top-block__background">
                        <video src={ToursBackground} autoPlay playsInline loop muted></video>
                    </div>
                </div>
            <div className='tours-block'>
                <div className="tours-block__container _container">
                    {selectedFilteredOnMainGuests || selectedFilteredOnMainPriceRange || selectedFilteredOnMainCountry ? (
                        <div className="tours-block__title" data-aos="fade-up" data-aos-duration="1000">
                            {filteredOnMainTours.length > 0 ? (
                                <span>Tours for filters you have chosen</span>
                            ) : (
                                <span>
                                    <p style={{ color: 'rgb(149, 0, 0)', fontWeight: '700' }}>There are no tours found at this request</p>
                                    <p style={{ color: 'rgb(149, 0, 0)', fontWeight: '700'}}>Please return to the <a href="/">Home Page</a> and enter another search request</p>
                                </span>
                            )}
                            
                        </div>
                    ):('')}
                    {selectedFilteredOnMainGuests || selectedFilteredOnMainPriceRange || selectedFilteredOnMainCountry ? (
                        <div className="searched-tours__list">
                            {filteredOnMainTours.map(tour => (
                                <div className="tours__item" key={tour.id} data-aos="fade-up" data-aos-duration="1000">
                                    <div className="tours__item_photo">
                                        <img className="card-image" src={tour.photo} alt="hotel" />
                                        <a href={tour.link} rel="noreferrer" target='_blank' className="booking">
                                            <p>Click to book tour ticket</p>
                                        </a>
                                        <div className="total-price">
                                            <span className='total-price_text'>Total for {selectedFilteredOnMainGuests} person: <span>{(tour.price * selectedFilteredOnMainGuests).toFixed(2)}</span>$</span>
                                            <img src={ArrowDown} alt="" />
                                        </div>
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
                            ))}
                        </div>
                    ) : ('')}
                    
                    <div className="tours-block__title" data-aos="fade-up" data-aos-duration="1000">
                        Full list of tours
                    </div>
                    <div className="tours-block__list">
                        {tours.map(tour => (
                            <div className="tours__item" key={tour.id} data-aos="fade-up" data-aos-duration="1000">
                                <div className="tours__item_photo">
                                    <img className="card-image" src={tour.photo} alt="hotel" />
                                    <a href={tour.link} rel="noreferrer" target='_blank' className="booking">
                                        <p>Click to book tour ticket</p>
                                    </a>
                                    <div className="total-price">
                                        <span className='total-price_text'>Total for {selectedPeopleCount} person: <span>{(tour.price * selectedPeopleCount).toFixed(2)}</span>$</span>
                                        <img src={ArrowDown} alt="" />
                                    </div>
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
                        ))}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default ToursList;
