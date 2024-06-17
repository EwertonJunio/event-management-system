const ParticipantModel = require('../models/Participant');

exports.addParticipantEntry = async(req, res) => {
    const { eventId, userId } = req.body;
    try {
        const participant = new ParticipantModel({ eventId, userId });
        await participant.save();
        res.status(201).json(participant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.fetchParticipants = async(req, res) => {
    const { eventId } = req.params;
    try {
        const participants = await ParticipantModel.find({ eventId }).populate('userId', 'username');
        res.status(200).json(participants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};