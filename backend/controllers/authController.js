const jsonWebToken = require('jsonwebtoken');
const bcryptHash = require('bcrypt');
const UserModel = require('../models/User');

exports.createUser = async(req, res) => {
    const { username, password, role } = req.body;
    try {
        const hashedPassword = await bcryptHash.hash(password, 10);
        const user = new UserModel({ username, password: hashedPassword, role });
        await user.save();
        res.status(201).json({ message: 'Usuário registrado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.userLogin = async(req, res) => {
    const { username, password } = req.body;
    try {
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }
        const isMatch = await bcryptHash.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciais inválidas' });
        }
        const token = jsonWebToken.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};