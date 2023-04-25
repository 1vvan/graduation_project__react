import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

const AddReviewModal = ({ showModal, handleModalClose }) => {

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
            window.location.reload();
            handleModalClose();
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
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit the line in the table</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddReview}>
                        <Form.Group className='mb-2'>
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type="text" name="name" placeholder='Enter review name'/>
                        </Form.Group>

                        <Form.Group className='mb-2'>
                            <Form.Label>Message:</Form.Label>
                            <Form.Control type="text" name="message" placeholder='Enter review message'/>
                        </Form.Group>
                        <Form.Group className='mb-2'>
                            <Form.Label>Mark:</Form.Label>
                            <Form.Control type="text" name="mark" placeholder='Enter review mark'/>
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

export default AddReviewModal;
