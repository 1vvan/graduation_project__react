import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

const EditTourModal = ({ setTours, showModal, handleModalClose, currentTour }) => {

    const handleEditSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        formData.append('id', currentTour.id);

        fetch('http://localhost:8888/graduation/Tours/updateTour.php', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
            // Обновляем список отелей в стейте
            setTours(prevTours => {
                const updatedTours = prevTours.map(tour => {
                if (tour.id === currentTour.id) {
                    return {
                    ...tour,
                    ...data,
                    };
                }
                return tour;
                });
                return updatedTours;
            });
            // Закрываем модальное окно
                handleModalClose();
                toast.success('All changes are saved');
            })
            .catch(error => console.error(error));
    };

    return (
        <>
            <ToastContainer
                autoClose={3000}
            />
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit the line in the table</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleEditSubmit}>
                        <Form.Group className='mb-2'>
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type="text" name="name" defaultValue={currentTour.name}/>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>City From:</Form.Label>
                            <Form.Control type="text" name="cityFrom" defaultValue={currentTour.cityFrom}/>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>Country From:</Form.Label>
                            <Form.Control type="text" name="countryFrom" defaultValue={currentTour.countryFrom}/>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>City To:</Form.Label>
                            <Form.Control type="text" name="cityTo" defaultValue={currentTour.cityTo}/>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>Country To:</Form.Label>
                            <Form.Control type="text" name="countryTo" defaultValue={currentTour.countryTo}/>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>Photo:</Form.Label>
                            <Form.Control type="text" name="photo" defaultValue={currentTour.photo}/>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>Link:</Form.Label>
                            <Form.Control type="text" name="link" defaultValue={currentTour.link}/>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>Price:</Form.Label>
                            <Form.Control type="text" name="price" defaultValue={currentTour.price}/>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>Max Persons:</Form.Label>
                            <Form.Control type="text" name="maxPersons" defaultValue={currentTour.maxPersons}/>
                        </Form.Group>

                        <Button style={{width: '100%'}} variant="success" type="submit">
                            Save changes
                        </Button>
                    </Form>
                </Modal.Body>
        </Modal>
        </>
    );
}

export default EditTourModal;
