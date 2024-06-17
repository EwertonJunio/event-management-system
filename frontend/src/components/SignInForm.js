import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box, Link } from '@mui/material';

const AuthForm = ({ onAuthenticate, showRegisterForm }) => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    const handleLogin = async(event) => {
        event.preventDefault();
        try {
            const response = await api.post('/auth/login', { username: user, password: pass });
            localStorage.setItem('authToken', response.data.token);
            onAuthenticate(true);
        } catch (err) {
            console.error('Login error:', err);
            alert('Failed to login');
        }
    };

    return ( <
        Container maxWidth = "sm" >
        <
        Box display = "flex"
        flexDirection = "column"
        alignItems = "center" >
        <
        Typography variant = "h4"
        component = "h1"
        gutterBottom >
        Sign In <
        /Typography> <
        form onSubmit = { handleLogin } >
        <
        TextField label = "Username"
        value = { user }
        onChange = {
            (e) => setUser(e.target.value)
        }
        fullWidth margin = "normal"
        required /
        >
        <
        TextField label = "Password"
        type = "password"
        value = { pass }
        onChange = {
            (e) => setPass(e.target.value)
        }
        fullWidth margin = "normal"
        required /
        >
        <
        Button type = "submit"
        variant = "contained"
        color = "primary"
        fullWidth >
        Sign In <
        /Button> <
        Box mt = { 2 } >
        <
        Link component = "button"
        variant = "body2"
        onClick = {
            () => showRegisterForm(true)
        } >
        No account ? Register now <
        /Link> < /
        Box > <
        /form> < /
        Box > <
        /Container>
    );
};

export default AuthForm;