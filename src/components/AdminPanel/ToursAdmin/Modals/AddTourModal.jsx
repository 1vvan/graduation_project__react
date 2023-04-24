import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

const AddTourModal = ({ showModal, handleModalClose, setShowTable }) => {

    const handleAdd = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        try {
            const response = await fetch('http://localhost:8888/graduation/Tours/addTour.php', {
            method: 'POST',
            body: formData
            });

            if (!response.ok) {
            throw new Error('Failed to add tour');
            }
            handleModalClose();
            toast.success('Tour is added')
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
                    <Form onSubmit={handleAdd}>
                        <Form.Group className='mb-2'>
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type="text" name="name" placeholder='Enter tour name'/>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>City From:</Form.Label>
                            <Form.Control type="text" name="cityFrom" placeholder='Enter tour city from'/>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>Country From:</Form.Label>
                            <Form.Control type="text" name="countryFrom" placeholder='Enter tour country from'/>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>City To:</Form.Label>
                            <Form.Control type="text" name="cityTo" placeholder='Enter tour city to'/>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>Country To:</Form.Label>
                            <Form.Control type="text" name="countryTo" placeholder='Enter tour country to'/>
                        </Form.Group>


                        <Form.Group className='mb-2'>
                            <Form.Label>Photo:</Form.Label>
                            <Form.Control type="text" name="photo" placeholder='Enter tour photo link'/>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>Link:</Form.Label>
                            <Form.Control type="text" name="link" placeholder='Enter tour booking link'/>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>Price:</Form.Label>
                            <Form.Control type="text" name="price" placeholder='Enter tour price'/>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>Max Persons:</Form.Label>
                            <Form.Control type="text" name="maxPersons" placeholder='Enter tour max persons'/>
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

export default AddTourModal;
