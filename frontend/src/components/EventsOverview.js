import React, { useState, useEffect, useCallback } from 'react';
import { Container, List, ListItem, ListItemText, Button, Typography, Box } from '@mui/material';
import api from '../api';
import EventManager from './EventManager';

const EventsOverview = () => {
    const [eventsData, setEventsData] = useState([]);
    const [currentEvent, setCurrentEvent] = useState(null);

    const loadEvents = useCallback(async() => {
        try {
            const response = await api.get('/events');
            setEventsData(response.data);
        } catch (error) {
            console.error('Falha ao buscar eventos:', error);
            alert('Erro ao buscar eventos');
        }
    }, []);

    useEffect(() => {
        loadEvents();
    }, [loadEvents]);

    const handleEventSave = () => {
        setCurrentEvent(null);
        loadEvents();
    };

    const handleEventEdit = (event) => {
        setCurrentEvent(event);
    };

    const handleEventDelete = async(id) => {
        try {
            await api.delete(`/events/${id}`);
            setEventsData(eventsData.filter(event => event._id !== id));
        } catch (error) {
            console.error('Falha ao deletar evento:', error);
            alert('Erro ao deletar evento');
        }
    };

    return ( <
        Container >
        <
        Typography variant = "h4"
        component = "h1"
        gutterBottom >
        Visão Geral dos Eventos <
        /Typography> <
        List > {
            eventsData.map(event => ( <
                ListItem key = { event._id }
                divider >
                <
                ListItemText primary = { event.title }
                /> <
                Button variant = "contained"
                color = "primary"
                onClick = {
                    () => handleEventEdit(event)
                } >
                Editar <
                /Button> <
                Button variant = "contained"
                color = "secondary"
                onClick = {
                    () => handleEventDelete(event._id)
                } >
                Deletar <
                /Button> < /
                ListItem >
            ))
        } <
        /List> <
        Box mt = { 4 } >
        <
        EventManager currentEvent = { currentEvent }
        onSave = { handleEventSave }
        /> < /
        Box > <
        /Container>
    );
};

export default EventsOverview;