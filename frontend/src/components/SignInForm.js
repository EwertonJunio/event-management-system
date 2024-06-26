import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box, Link } from '@mui/material';
import api from '../api';

const SignInForm = ({ setAuth, showRegisterForm }) => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    const handleLogin = async(event) => {
        event.preventDefault();
        try {
            const response = await api.post('/auth/login', { username: user, password: pass });
            localStorage.setItem('authToken', response.data.token);
            setAuth(true);
        } catch (err) {
            console.error('Erro no login:', err);
            alert('Falha ao fazer login');
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
        Entrar <
        /Typography> <
        form onSubmit = { handleLogin } >
        <
        TextField label = "Usuário"
        value = { user }
        onChange = {
            (e) => setUser(e.target.value) }
        fullWidth margin = "normal"
        required / >
        <
        TextField label = "Senha"
        type = "password"
        value = { pass }
        onChange = {
            (e) => setPass(e.target.value) }
        fullWidth margin = "normal"
        required / >
        <
        Button type = "submit"
        variant = "contained"
        color = "primary"
        fullWidth >
        Entrar <
        /Button> <
        Box mt = { 2 } >
        <
        Link component = "button"
        variant = "body2"
        onClick = {
            () => showRegisterForm(true) } >
        Registre - se agora <
        /Link> <
        /Box> <
        /form> <
        /Box> <
        /Container>
    );
};

export default SignInForm;