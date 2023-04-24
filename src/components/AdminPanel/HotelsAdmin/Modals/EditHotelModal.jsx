import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

const EditHotelModal = ({ setHotels, showModal, handleModalClose, currentHotel }) => {

    const handleEditSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        formData.append('id', currentHotel.id);

        fetch('http://localhost:8888/graduation/Hotels/updateHotel.php', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
            // Обновляем список отелей в стейте
            setHotels(prevHotels => {
                const updatedHotels = prevHotels.map(hotel => {
                if (hotel.id === currentHotel.id) {
                    return {
                    ...hotel,
                    ...data,
                    };
                }
                return hotel;
                });
                return updatedHotels;
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
                            <Form.Control type="text" name="name" defaultValue={currentHotel.name}/>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>Country:</Form.Label>
                            <Form.Control type="text" name="country" defaultValue={currentHotel.country}/>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>City:</Form.Label>
                            <Form.Control type="text" name="city" defaultValue={currentHotel.city}/>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>Photo:</Form.Label>
                            <Form.Control type="text" name="photo" defaultValue={currentHotel.photo}/>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>Link:</Form.Label>
                            <Form.Control type="text" name="link" defaultValue={currentHotel.link}/>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>Mark:</Form.Label>
                            <Form.Control type="text" name="mark" defaultValue={currentHotel.mark}/>
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

export default EditHotelModal;
