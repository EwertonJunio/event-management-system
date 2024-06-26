import React, { useState } from 'react';
import api from '../api';
import { Button, TextField, Container, Typography, Box, MenuItem } from '@mui/material';

const RegisterForm = ({ setAuth }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', { username, password, role });
            alert('Registro bem-sucedido. Você agora pode fazer login.');
        } catch (error) {
            console.error(error);
            alert('Falha no registro');
        }
    };

    return ( <
        Container maxWidth = "xs" >
        <
        Box display = "flex"
        flexDirection = "column"
        alignItems = "center" >
        <
        Typography variant = "h5"
        component = "h1"
        gutterBottom >
        Registrar <
        /Typography> <
        form onSubmit = { handleSubmit } >
        <
        TextField label = "Usuário"
        value = { username }
        onChange = {
            (e) => setUsername(e.target.value) }
        fullWidth margin = "normal"
        required / >
        <
        TextField label = "Senha"
        type = "password"
        value = { password }
        onChange = {
            (e) => setPassword(e.target.value) }
        fullWidth margin = "normal"
        required / >
        <
        TextField label = "Função"
        select value = { role }
        onChange = {
            (e) => setRole(e.target.value) }
        fullWidth margin = "normal" >
        <
        MenuItem value = "user" > Usuário < /MenuItem> <
        MenuItem value = "admin" > Administrador < /MenuItem> <
        /TextField> <
        Button type = "submit"
        variant = "contained"
        color = "primary"
        fullWidth >
        Registrar <
        /Button> <
        /form> <
        /Box> <
        /Container>
    );
};

export default RegisterForm;