import React, { useEffect, useState } from 'react';
import EditIcon from '../../../assets/icons/editing.png'
import DeleteIcon from '../../../assets/icons/delete.png'
import { Button, Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import EditTourModal from './Modals/EditTourModal';
import AddTourModal from './Modals/AddTourModal';

const ToursAdmin = ({ show, setShow }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const handleEditModalClose = () => setShowEditModal(false);
    const handleEditModalShow = () => setShowEditModal(true);

    const [showAddModal, setShowAddModal] = useState(false);
    const handleAddModalClose = () => setShowAddModal(false);
    const handleAddModalShow = () => setShowAddModal(true);
    
    const [currentTour, setCurrentTour] = useState([]);

    const [tours, setTours] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8888/graduation/Tours/getTours.php')
            .then(response => response.json())
            .then(data => setTours(data))
            .catch(error => console.error(error));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            fetch(`http://localhost:8888/graduation/Tours/deleteTour.php?id=${id}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                setTours(tours.filter(tour => tour.id !== id));
                toast.warning('Tour is deleted')
            })
            .catch(error => console.error(error));
        }
    }

    return (
        <>
            <ToastContainer
                autoClose={3000}
            />
            <Container className={show === 'tours' ? 'active' : 'disable'} style={{ overflowX: 'auto', padding: '20px 0px' }}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{ width: '1%' }}>ID</th>
                            <th style={{ width: '20%' }}>Name</th>
                            <th style={{ width: '20%' }}>City From</th>
                            <th style={{ width: '20%' }}>Country From</th>
                            <th style={{ width: '20%' }}>City To</th>
                            <th style={{ width: '20%' }}>Country To</th>
                            <th style={{ width: '20%' }}>Photo</th>
                            <th style={{ width: '20%' }}>Link</th>
                            <th style={{ width: '1%' }}>Price ($)</th>
                            <th style={{ width: '20%' }}>Max Persons</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tours.map((tour) => (
                            <tr key={tour.id} >
                                <td>{tour.id}</td>
                                <td>{tour.name}</td>
                                <td>{tour.cityFrom}</td>
                                <td>{tour.countryFrom}</td>
                                <td>{tour.cityTo}</td>
                                <td>{tour.countryTo}</td>
                                <td>
                                    <Link
                                        to={tour.photo}
                                        target="_blank" rel="noopener noreferrer"
                                    >
                                        {tour.photo.slice(0, 50) + '...'}
                                    </Link>
                                </td>
                                <td>
                                    <Link
                                        to={tour.link}
                                        target="_blank" rel="noopener noreferrer"
                                    >
                                        {tour.link.slice(0, 50) + '...'}
                                    </Link>
                                </td>
                                <td>{tour.price}</td>
                                <td>{tour.maxPersons}</td>
                                <td>
                                    <Button variant="warning" onClick={() => { handleEditModalShow(); setCurrentTour(tour)} }>
                                        <img src={EditIcon} alt="" />
                                    </Button>
                                    <Button variant="danger" onClick={() => handleDelete(tour.id)}>
                                        <img src={DeleteIcon} alt="" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Button variant='success' style={{width: '100%'}} onClick={() => handleAddModalShow()}>
                    Add Tour
                </Button>
            </Container>

            <EditTourModal setTours={setTours} currentTour={currentTour} showModal={showEditModal} handleModalClose={handleEditModalClose} />
            <AddTourModal showModal={showAddModal} handleModalClose={handleAddModalClose} setShowTable={setShow} />
        </>
    );
}

export default ToursAdmin;
