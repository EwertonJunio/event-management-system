import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import api from '../api';

const EventManager = ({ currentEvent, onSave }) => {
    const [formState, setFormState] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        organizer: ''
    });

    useEffect(() => {
        if (currentEvent) {
            setFormState({
                title: currentEvent.title,
                description: currentEvent.description,
                date: currentEvent.date,
                location: currentEvent.location,
                organizer: currentEvent.organizer
            });
        }
    }, [currentEvent]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            if (currentEvent && currentEvent._id) {
                await api.put(`/events/${currentEvent._id}`, formState);
            } else {
                await api.post('/events', formState);
            }
            onSave();
        } catch (error) {
            console.error('Error saving event:', error);
            alert('Error saving event');
        }
    };

    return ( <
        Box component = "form"
        onSubmit = { handleSubmit } >
        <
        TextField label = "Title"
        name = "title"
        value = { formState.title }
        onChange = { handleChange }
        fullWidth margin = "normal"
        required /
        >
        <
        TextField label = "Description"
        name = "description"
        value = { formState.description }
        onChange = { handleChange }
        fullWidth margin = "normal"
        required /
        >
        <
        TextField type = "date"
        name = "date"
        value = { formState.date.split('T')[0] }
        onChange = { handleChange }
        fullWidth margin = "normal"
        required /
        >
        <
        TextField label = "Location"
        name = "location"
        value = { formState.location }
        onChange = { handleChange }
        fullWidth margin = "normal"
        required /
        >
        <
        TextField label = "Organizer"
        name = "organizer"
        value = { formState.organizer }
        onChange = { handleChange }
        fullWidth margin = "normal"
        required /
        >
        <
        Button type = "submit"
        variant = "contained"
        color = "primary"
        fullWidth > { currentEvent ? 'Update Event' : 'Create Event' } <
        /Button> <
        /Box>
    );
};

export default EventManager;