import React, { useState } from 'react';
import Header from '../PageHeader/Header';
import CompanyBackground from '../../assets/videos/company_bg.mp4'
import { ToastContainer, toast } from 'react-toastify';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import './Company.scss'
import Footer from '../PageFooter/Footer';

const Company = () => {

    const [currentPage, setCurrentPage] = useState('сompany');
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const [nameValue, setNameValue] = useState('');
    const [messageValue, setMessageValue] = useState('');
    const [markValue, setMarkValue] = useState('');
    const handleAddReview = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        try {
            const response = await fetch('http://localhost:8888/graduation/Reviews/addReview.php', {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                throw new Error('Failed to add review');
            }
            setNameValue('');
            setMessageValue('')
            setMarkValue('')
            toast.success('Review is added')
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <ToastContainer
                autoClose={3000}
            />
            <Header currentPage={currentPage} handlePageChange={handlePageChange} />
            <div className="main__top-block company__top-block top-block ">
                <div className="top-block__container _container">
                    <div className="top-block__body">
                        <h1 className="top-block__title company__title" data-aos="zoom-in">Why Adventurize</h1>
                    </div>
                </div>
                <div className="top-block__background">
                    <video src={CompanyBackground} autoPlay playsInline loop muted></video>
                </div>
            </div>
            <div className="main__company company">
                <div className="company__container _container">
                    <div className="company__mission company__block-item mission" data-aos="fade-left" data-aos-duration="1000">
                        <div className="mission__content company__block-content">
                            <div className="mission__content_text company__block-content_text">
                                <p className="mission__title company__block-content_title">The mission of our company </p>
                                <p className='mission__subtitle company__block-content_subtitle'>
                                    The mission of our company is to help people get unforgettable travel experiences. We believe that travel helps to expand one's horizons, discover new cultures and traditions, as well as enjoy the wonderful views and unique natural beauties of the world. We strive to make every trip memorable and easy for our clients by providing the best service and personal approach.
                                </p>
                            </div>
                            <div className="mission__image company__block-content_image"></div>
                        </div>
                    </div>
                    <div className="company__team company__block-item team" data-aos="fade-right" data-aos-duration="1000">
                        <div className="team__content company__block-content">
                            <div className="team__image company__block-content_image"></div>
                            <div className="team__content_text company__block-content_text">
                                <p className="team__title company__block-content_title">Our team </p>
                                <p className='team__subtitle company__block-content_subtitle'>
                                    Our team consists of experts in tourism, marketing, sales, hospitality and technology. We work with innovative methods and technologies to provide our clients with the highest level of service quality and satisfaction. We are proud of our team and we are convinced that our professional and friendly work allows us to provide an unforgettable travel experience for our clients.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="company__awards company__block-item awards" data-aos="fade-left" data-aos-duration="1000">
                        <div className="awards__content company__block-content">
                            <div className="awards__content_text company__block-content_text">
                                <p className="awards__title company__block-content_title">Our awards and achievements </p>
                                <ul className='awards__subtitle company__block-content_subtitle'>
                                    <li><strong>Travel Weekly Magellan Awards 2020:</strong> Our Exotic Asia Tour won Silver in the Best 10-14 Day Tour category.</li>
                                    <li><strong>World Travel Awards 2019:</strong> our company was nominated in the category "Best Tour Operator".</li>
                                    <li><strong>Competition "Tour Operator of the Year 2018":</strong> our company took 1st place in the category "Best Tour Operator of the Year"</li>
                                    <li><strong>Recognition of our customers:</strong> we greatly value the opinion and feedback of our customers, which are the most important sources of information for us about the quality of our services.</li>
                                </ul>
                            </div>
                            <div className="awards__image company__block-content_image"></div>
                        </div>
                    </div>
                    <div className="company__block-item company__review review ">
                        <div className="review__content company__block-content">
                            <div className="review__title company__block-content_title">Write your review</div>
                            <Form onSubmit={handleAddReview} className='review__form'>
                                <Form.Group className='mb-2'>
                                    <Form.Label>Name:</Form.Label>
                                    <FloatingLabel label="Enter your name and surname">
                                        <Form.Control type="text" value={nameValue} onChange={(e)=>setNameValue(e.target.value)} name="name" placeholder='Enter your name and surname' required/>
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group className='mb-2'>
                                    <Form.Label>Message:</Form.Label>
                                    <FloatingLabel label="Enter review message">
                                        <Form.Control as={'textarea'} value={messageValue} onChange={(e)=>setMessageValue(e.target.value)} name="message" placeholder='Enter review message' required/>
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group className='mb-2' controlId="numberInput">
                                    <Form.Label>Mark:</Form.Label>
                                    <FloatingLabel label="Enter review mark">
                                        <Form.Control type="number" min="0" max="5" step="1" value={markValue} onChange={(e)=>setMarkValue(e.target.value)} name="mark" placeholder='Enter review mark' pattern="[0-5]" required/>
                                    </FloatingLabel>
                                </Form.Group>
                                <Button style={{ width: '100%' }} variant="success" type="submit">
                                    Add review
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Company;
