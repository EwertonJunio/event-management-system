const mongoose = require('mongoose');

const connectToDatabase = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conexão com MongoDB estabelecida');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectToDatabase;