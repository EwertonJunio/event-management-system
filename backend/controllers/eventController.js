const EventModel = require('../models/Event');

exports.createEvent = async(req, res) => {
    const { title, description, date, location, organizer } = req.body;
    try {
        const newEvent = new EventModel({ title, description, date, location, organizer });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getEvents = async(req, res) => {
    try {
        const events = await EventModel.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateEvent = async(req, res) => {
    const { id } = req.params;
    const { title, description, date, location, organizer } = req.body;
    try {
        const updatedEvent = await EventModel.findByIdAndUpdate(id, { title, description, date, location, organizer }, { new: true });
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteEvent = async(req, res) => {
    const { id } = req.params;
    try {
        await EventModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Evento excluído' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};