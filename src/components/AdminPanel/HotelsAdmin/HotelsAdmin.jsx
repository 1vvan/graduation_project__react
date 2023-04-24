import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EditIcon from '../../../assets/icons/editing.png'
import DeleteIcon from '../../../assets/icons/delete.png'
import '../AdminTable.scss'
import { ToastContainer, toast } from 'react-toastify';
import EditHotelModal from './Modals/EditHotelModal';
import AddHotelModal from './Modals/AddHotelModal';

const HotelsAdmin = ({show}) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const handleEditModalClose = () => setShowEditModal(false);
    const handleEditModalShow = () => setShowEditModal(true);

    const [showAddModal, setShowAddModal] = useState(false);
    const handleAddModalClose = () => setShowAddModal(false);
    const handleAddModalShow = () => setShowAddModal(true);
    
    const [currentHotel, setCurrentHotel] = useState([]);


    const [hotels, setHotels] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8888/graduation/Hotels/getHotels.php')
            .then(response => response.json())
            .then(data => setHotels(data))
            .catch(error => console.error(error));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            fetch(`http://localhost:8888/graduation/Hotels/deleteHotel.php?id=${id}`, {
            method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                // Обновляем список отелей после удаления
                setHotels(hotels.filter(hotel => hotel.id !== id));
                toast.warning('Hotel is deleted')
            })
            .catch(error => console.error(error));
        }
    }


    return (
        <>
            <ToastContainer
                autoClose={3000}
            />
            <Container className={show === 'hotels' ? 'active' : 'disable'} style={{ overflowX: 'auto', padding: '20px 0px' }}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{ width: '1%' }}>ID</th>
                            <th style={{ width: '20%' }}>Name</th>
                            <th style={{ width: '20%' }}>City</th>
                            <th style={{ width: '20%' }}>Country</th>
                            <th style={{ width: '20%' }}>Photo</th>
                            <th style={{ width: '1%' }}>Mark</th>
                            <th style={{ width: '20%' }}>Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hotels.map((hotel) => (
                            <tr key={hotel.id} >
                                <td>{hotel.id}</td>
                                <td>{hotel.name}</td>
                                <td>{hotel.city}</td>
                                <td>{hotel.country}</td>
                                <td>
                                    <Link
                                        to={hotel.photo}
                                        target="_blank" rel="noopener noreferrer"
                                    >
                                        {hotel.photo.slice(0, 50) + '...'}
                                    </Link>
                                </td>
                                <td>{hotel.mark}</td>
                                <td>
                                    <Link
                                        to={hotel.link}
                                        target="_blank" rel="noopener noreferrer"
                                    >
                                        {hotel.link.slice(0, 50) + '...'}
                                    </Link>
                                </td>
                                <td>
                                    <Button variant="warning" onClick={() => { handleEditModalShow(); setCurrentHotel(hotel)} }>
                                        <img src={EditIcon} alt="" />
                                    </Button>
                                    <Button variant="danger" onClick={() => handleDelete(hotel.id)}>
                                        <img src={DeleteIcon} alt="" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Button variant='success' style={{width: '100%'}} onClick={() => handleAddModalShow()}>
                    Add Hotel
                </Button>
            </Container>
            <EditHotelModal setHotels={setHotels} currentHotel={currentHotel} showModal={showEditModal} handleModalClose={handleEditModalClose} />
            <AddHotelModal showModal={showAddModal} handleModalClose={handleAddModalClose} />
        </>
    );
}

export default HotelsAdmin;
