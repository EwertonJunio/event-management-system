import React, { useState } from 'react';
import api from '../api';
import { Button, TextField, Container, Typography, Box, MenuItem } from '@mui/material';

const RegisterForm = ({ setAuth }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', { username, password, role });
            alert('Registration successful. You can now log in.');
        } catch (error) {
            console.error(error);
            alert('Registration failed');
        }
    };

    return (
        <Container maxWidth="xs">
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h5" component="h1" gutterBottom>
                    Register
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Role"
                        select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        fullWidth
                        margin="normal"
                    >
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                    </TextField>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Register
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default RegisterForm;
