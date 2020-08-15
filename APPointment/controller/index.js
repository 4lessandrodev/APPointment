const { User } = require('./../models');
const bcrypt = require('bcrypt');

module.exports = {

    index: async (req, res) => {
        try {
            const users = await User.findAll();
            res.status(200).json({ users });   
        } catch (error) {
            console.error(error);
            return res.status(501).json({ error:error.message });
        }
    },

    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const userAlreadyExist = await User.findOne({ where: { email } });
            if (userAlreadyExist) {
                return res.status(401).json({ error: true, messages: [{ text: 'Este email já está cadastrado' }] });
            }
            const encryptedPassword = bcrypt.hashSync(password, 10);
            const result = await User.create({ name, email, password: encryptedPassword });
            result.password = undefined;
            return res.status(200).json({ result });
        } catch (error) {
            console.error(error);
            return res.status(501).json({ error:error.message });
        }
    },

    login: async (req, res) => {
        
    }

};