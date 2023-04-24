import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

const AddHotelModal = ({ showModal, handleModalClose }) => {

    const handleAddHotel = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        try {
            const response = await fetch('http://localhost:8888/graduation/Hotels/addHotel.php', {
            method: 'POST',
            body: formData
            });

            if (!response.ok) {
            throw new Error('Failed to add hotel');
            }
            window.location.reload();
            handleModalClose();
            toast.success('Hotel is added')
        } catch (error) {
            console.error(error);
        }
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
                    <Form onSubmit={handleAddHotel}>
                        <Form.Group className='mb-2'>
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type="text" name="name" placeholder='Enter hotel name'/>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>Country:</Form.Label>
                            <Form.Control type="text" name="country" placeholder='Enter hotel country'/>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>City:</Form.Label>
                            <Form.Control type="text" name="city" placeholder='Enter hotel city'/>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>Photo:</Form.Label>
                            <Form.Control type="text" name="photo" placeholder='Enter hotel photo link'/>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>Link:</Form.Label>
                            <Form.Control type="text" name="link" placeholder='Enter hotel booking link'/>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>Mark:</Form.Label>
                            <Form.Control type="text" name="mark" placeholder='Enter hotel mark'/>
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

export default AddHotelModal;
