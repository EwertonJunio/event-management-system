const express = require('express');
const { addParticipant, getParticipants } = require('../controllers/participantController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, addParticipant);
router.get('/:eventId', authMiddleware, getParticipants);

module.exports = router;
