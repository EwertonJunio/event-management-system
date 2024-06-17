const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

const userAuthRoutes = require('./routes/userAuthRoutes');
const eventManagementRoutes = require('./routes/eventManagementRoutes');
const participantManagementRoutes = require('./routes/participantManagementRoutes');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/auth', userAuthRoutes);
app.use('/api/events', eventManagementRoutes);
app.use('/api/participants', participantManagementRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`)))
    .catch(err => console.log(err));