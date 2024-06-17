const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
    eventId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'EventEntry', 
        required: true 
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'UserEntry', 
        required: true 
    }
});

const ParticipantEntry = mongoose.model('ParticipantEntry', participantSchema);

module.exports = ParticipantEntry;
