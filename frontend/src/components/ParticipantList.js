import React, { useState, useEffect } from 'react';
import api from '../api';

const ParticipantList = ({ eventId }) => {
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await api.get(`/participants/${eventId}`);
                setParticipants(response.data);
            } catch (error) {
                console.error('Falha ao buscar participantes:', error);
            }
        };
        fetchData();
    }, [eventId]);

    return ( <
        div >
        <
        h2 > Participantes < /h2> <
        ul > {
            participants.map(participant => ( <
                li key = { participant._id } > { participant.userId.username } < /li>
            ))
        } <
        /ul> <
        /div>
    );
};

export default ParticipantList;