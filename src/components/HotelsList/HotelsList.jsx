import React, { useEffect, useState } from 'react';
import MapPointHotels from '../../assets/images/hotels/icons/map-point.png'
import Select from 'react-select';
import MapPoint from '../../assets/images/top-block/icons/map-point.svg'
import SortIcon from '../../assets/icons/sort.png'
import ReloadIcon from '../../assets/icons/reload.png'
import CheckIcon from '../../assets/icons/check.png'
import HotelsBackground from '../../assets/videos/hotels_bg.mp4'
import Header from '../PageHeader/Header';
import Footer from '../PageFooter/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './HotelsList.scss'

const HotelsList = () => {
    const [hotels, setHotels] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8888/graduation/Hotels/getHotels.php')
            .then(response => response.json())
            .then(data => setHotels(data))
            .catch(error => console.error(error));
    }, []);

    const [currentPage, setCurrentPage] = useState('hotels');
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedSortType, setSelectedSortType] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const handleReloadHotels = () => {
        fetch('http://localhost:8888/graduation/Hotels/getHotels.php')
        .then(response => response.json())
        .then(data => setHotels(data))
            .catch(error => console.error(error));
        setSelectedCountry('')
        setSelectedSortType('')
        setSearchQuery('')
        toast.success('All hotels are displayed');
    }


    const locationOption = [
        { value: 'usa', label: 'USA' },
        { value: 'ua', label: 'Ukraine' },
        { value: 'fr', label: 'France' }
    ];
    const sortOption = [
        { value: 'mark', label: 'By Mark' },
        { value: 'country', label: 'By Country' },
        { value: 'city', label: 'By City' }
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
        fetch(`http://localhost:8888/graduation/Hotels/getHotels.php`)
        .then(response => response.json())
        .then(data => setHotels((data.filter(hotel => hotel.country.includes(selectedOption.label)))))
        .catch(error => console.error(error));
        toast.success('Hotels are sorted by the location');
    }

    const handleSortChange = (selectedSort) => {
        setSelectedSortType(selectedSort)
        console.log(selectedSortType);
            let sortedHotels = hotels;
            if (selectedSort.value === 'mark') {
                // сортировка по оценке
                sortedHotels = hotels.sort((a, b) => b.mark - a.mark);
                setHotels(sortedHotels);
                toast.success('Hotels are sorted by mark');
            } else if (selectedSort.value === 'country') {
                // сортировка по стране
                sortedHotels = hotels.sort((a, b) => {
                if (a.country < b.country) {
                    return -1;
                }
                if (a.country > b.country) {
                    return 1;
                }
                return 0;
                });
                setHotels(sortedHotels);
                toast.success('Hotels are sorted by country');
            } else if (selectedSort.value === 'city') {
                // сортировка по городу
                sortedHotels = hotels.sort((a, b) => {
                if (a.city < b.city) {
                    return -1;
                }
                if (a.city > b.city) {
                    return 1;
                }
                return 0;
                });
                setHotels(sortedHotels);
                toast.success('Hotels are sorted by city');
            }
    }

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const filteredHotels = hotels.filter((hotel) => {
            const query = searchQuery.toLowerCase();
            const name = hotel.name.toLowerCase();
            const city = hotel.city.toLowerCase();
            const country = hotel.country.toLowerCase();
            return name.includes(query) || country.includes(query) || city.includes(query);
        });
        if (searchQuery.length === 0) {
            toast.error('Please enter a search query');
        } else if (filteredHotels.length === 0) {
            toast.error('Hotels are not found');
            setSearchQuery('')
        } else {
            setHotels(filteredHotels);
            toast.success('Hotels are found'); 
        }
    };

    return (
        <>
            <ToastContainer
                autoClose={3000}
            />
            <Header currentPage={currentPage} handlePageChange={handlePageChange} />
            <div className="main__top-block top-block">
                    <div className="top-block__container _container">
                        <div className="top-block__body">
                            <h1 className="top-block__title" data-aos="zoom-in">Choose the best hotel for you</h1>
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
                        <video src={HotelsBackground} autoPlay playsInline loop muted></video>
                    </div>
                </div>
            <div className='hotels-block'>
                <div className="hotels-block__container _container">
                    <div className="hotels-block__list">
                        {hotels.map(hotel => (
                            <div className="hotel__item" key={hotel.id} data-aos="fade-up" data-aos-duration="1000">
                                <div className="hotel__item_photo">
                                    <img className="card-image" src={hotel.photo} alt="hotel" />
                                    <a href={hotel.link} rel="noreferrer" target='_blank' className="booking">
                                        <p>Click to book hotel room</p>
                                    </a>
                                    <div className="hotel__item_mark">{hotel.mark}</div>
                                </div>
                                <div className="hotel__item_text">
                                    <div className="hotel__item_title">{hotel.name}</div>
                                    <div className="hotel__item_subtitle">
                                        <div className="hotel__item_location">
                                            <img src={MapPointHotels} alt="" />{hotel.city}, {hotel.country}
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

export default HotelsList;
