import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import HotelsAdmin from './HotelsAdmin/HotelsAdmin';
import ToursAdmin from './ToursAdmin/ToursAdmin';
import './AdminPanel.scss'


const AdminPanel = () => {
    const [showTables, setShowTables] = useState('hotels');

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/admin/panel">
                        <span style={{ color: 'green' }}>Adventurize</span> Admin Panel
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Go to website home page</Nav.Link>
                            <Nav.Link onClick={() => setShowTables('hotels')}>Hotels Data Base</Nav.Link>
                            <Nav.Link onClick={() => setShowTables('tours')}>Tours Data Base</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <HotelsAdmin show={showTables} setShow={setShowTables} />
            <ToursAdmin show={showTables} setShow={setShowTables} />
        </>
    );
}

export default AdminPanel;
