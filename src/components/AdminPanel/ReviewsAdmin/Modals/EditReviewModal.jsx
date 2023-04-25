import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

const EditReviewModal = ({ setReviews, showModal, handleModalClose, currentReview }) => {

    const handleEditSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        formData.append('id', currentReview.id);

        fetch('http://localhost:8888/graduation/Reviews/updateReview.php', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
            setReviews(prevReviews => {
                const updatedReviews = prevReviews.map(review => {
                if (review.id === currentReview.id) {
                    return {
                    ...review,
                    ...data,
                    };
                }
                return review;
                });
                return updatedReviews;
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
                            <Form.Control type="text" name="name" defaultValue={currentReview.name}/>
                        </Form.Group>
                        <Form.Group className='mb-2'>
                            <Form.Label>Message:</Form.Label>
                            <Form.Control type="text" name="message" defaultValue={currentReview.message}/>
                        </Form.Group>
                        <Form.Group className='mb-2'>
                            <Form.Label>Mark:</Form.Label>
                            <Form.Control type="text" name="mark" defaultValue={currentReview.mark}/>
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

export default EditReviewModal;
