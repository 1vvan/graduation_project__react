import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import EditIcon from '../../../assets/icons/editing.png'
import DeleteIcon from '../../../assets/icons/delete.png'
import '../AdminTable.scss'
import { ToastContainer, toast } from 'react-toastify';
import EditReviewModal from './Modals/EditReviewModal';
import AddReviewModal from './Modals/AddReviewModal';

const ReviewsAdmin = ({show}) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const handleEditModalClose = () => setShowEditModal(false);
    const handleEditModalShow = () => setShowEditModal(true);

    const [showAddModal, setShowAddModal] = useState(false);
    const handleAddModalClose = () => setShowAddModal(false);
    const handleAddModalShow = () => setShowAddModal(true);
    
    const [currentReview, setCurrentReview] = useState([]);


    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8888/graduation/Reviews/getReviews.php')
            .then(response => response.json())
            .then(data => setReviews(data))
            .catch(error => console.error(error));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            fetch(`http://localhost:8888/graduation/Reviews/deleteReview.php?id=${id}`, {
            method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                setReviews(reviews.filter(reviews => reviews.id !== id));
                toast.warning('Review is deleted')
            })
            .catch(error => console.error(error));
        }
    }


    return (
        <>
            <ToastContainer
                autoClose={3000}
            />
            <Container className={show === 'reviews' ? 'active' : 'disable'} style={{ overflowX: 'auto', padding: '20px 0px' }}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{ width: '1%' }}>ID</th>
                            <th style={{ width: '15%' }}>Name</th>
                            <th style={{ width: '79%' }}>Message</th>
                            <th style={{ width: '2%' }}>Mark</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review) => (
                            <tr key={review.id} >
                                <td>{review.id}</td>
                                <td>{review.name}</td>
                                <td>{review.message}</td>
                                <td>{review.mark}</td>
                                <td>
                                    <Button variant="warning" onClick={() => { handleEditModalShow(); setCurrentReview(review)} }>
                                        <img src={EditIcon} alt="" />
                                    </Button>
                                    <Button variant="danger" onClick={() => handleDelete(review.id)}>
                                        <img src={DeleteIcon} alt="" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Button variant='success' style={{width: '100%'}} onClick={() => handleAddModalShow()}>
                    Add Review
                </Button>
            </Container>
            <EditReviewModal setReviews={setReviews} currentReview={currentReview} showModal={showEditModal} handleModalClose={handleEditModalClose} />
            <AddReviewModal showModal={showAddModal} handleModalClose={handleAddModalClose} />
        </>
    );
}

export default ReviewsAdmin;
