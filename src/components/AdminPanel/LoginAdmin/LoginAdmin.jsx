import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button, Container } from 'react-bootstrap';
import './LoginAdmin.scss'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const LoginAdmin = () => {

    const navigate = useNavigate();
    const [password, setPassword] = useState("");

    const [dataPasswords, setDataPasswords] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8888/graduation/getPasswords.php')
            .then(response => response.json())
            .then(data => setDataPasswords(data))
            .catch(error => console.error(error));
        console.log(dataPasswords);
    }, [dataPasswords]);

    const handleSubmit = (event) => {
        event.preventDefault();

        // проверяем, есть ли в массиве dataPasswords введенный пароль
        const isAdmin = dataPasswords.some(item => item.password === password);
        
        if (isAdmin) {
            localStorage.setItem('isAdmin', 'true');
            if (localStorage.getItem('isAdmin') === 'true') {
                navigate("/admin/panel");
            }
        } else {
            toast.error("Incorrect password");
        }
    };


    return (
        <>
            <ToastContainer
                autoClose={3000}
            />
            <Container className='form-container'>
                <Form className='form' onSubmit={handleSubmit}>
                    <Form.Label>Enter password to get access the panel</Form.Label>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{width: '100%'}}>
                        Submit
                    </Button>
                </Form>
            </Container>
        </>
    );
}

export default LoginAdmin;