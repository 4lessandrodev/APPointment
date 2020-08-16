const { User } = require('./../models');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const { validationResult } = require('express-validator');

module.exports = {
    
    index: async (req, res) => {
        try {
            const users = await User.findAll();
            res.status(200).json({ users });   
        } catch (error) {
           console.error(error.message);
            return res.status(501).json({ error:error.message });
        }
    },
    
    register: async (req, res) => {
        try {
            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            
            const { name, email, password } = req.body;
            const userAlreadyExist = await User.findOne({ where: { email } });
            if (userAlreadyExist) {
                return res.status(401).json({ error: true, messages: [{ text: 'Este email já está cadastrado' }] });
            }
            const encryptedPassword = bcrypt.hashSync(password, 10);
            const user = await User.create({ name, email, password: encryptedPassword });
            user.password = undefined;
            req.user = user;
            
            const token = await auth.generateToken(req, res);
            
            return res.status(200).json({ user, token });
        } catch (error) {
            console.error(error.message);
            return res.status(501).json({ error:error.message });
        }
    },
    
    login: async (req, res) => {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            
            const { password, email } = req.body;
            
            const user = await User.scope('withPassword').findOne({where:{email}});
            
            if (!user || user.email != email) {
                return res.status(401).json({ error: true, messages: [{ text: 'Email ou senha inválido' }] });
            }
            
            const passMatch = bcrypt.compareSync(password, user.password);
            
            if (!passMatch) {
                return res.status(401).json({ error: true, messages: [{ text: 'Email ou senha inválido' }] });
            }
            
            req.user = { id: user.id };
            
            const token = await auth.generateToken(req, res);
            
            return res.status(200).json({ token });
            
        } catch (error) {
            console.error(error.message);
            return res.status(501).json({ error:error.message });
        }
    }
    
};