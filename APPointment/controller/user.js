const { User, Team, team_has_users } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bcrypt = require('bcrypt');

module.exports = {

    index: async (req, res) => {
        try {
            const { user } = req;
            const teams = await team_has_users.findAll({
                where:{users_id:user.user_id}
            });
            const teamsIds = teams.map(team => team.teams_id);
            const users = await User.findAll({
                include: [{
                    model: Team,
                    as: 'team_users',
                    required: true,
                    where: {
                        id:{[Op.in]:teamsIds}
                    }
                }]
            });

            res.status(200).json({ users });

        } catch (error) {
            console.error(error);
            return res.status(501).json({ error:error.message });   
        }
    },

    update: async (req, res) => {
        try {
            const { user } = req;
            const { id } = req.params;
            let { name = '', email = '', password = '', admin = false } = req.body;

            password = (password != '') ? bcrypt.hashSync(password, 10) : '';
            admin = (user.admin) ? admin : false;
            name = (name !== '') ? name : 'username';

            const emailAlreadyExist = await User.findOne({ where: { email } });
            if (emailAlreadyExist) {
                return res.status(501).json({ error:'Este email já está em uso' }); 
            }
            const userToUpdate = await User.findByPk(id);

            if (!userToUpdate) {
                return res.status(501).json({ error:'Usuário não encontrado' }); 
            }

            (!emailAlreadyExist) ? userToUpdate.email = email : '';
            (password !== '') ? userToUpdate.password = password : '';
            (user.admin) ? userToUpdate.admin = admin : '';
            userToUpdate.name = name;
            const result = await userToUpdate.save();

            res.status(200).json({ result });

        } catch (error) {
            console.error(error);
            return res.status(501).json({ error:error.message });   
        }
    },

    show: async (req, res) => {
        try {
            const { email = '', id='' } = req.query;
            if (email !== '') {

                const user = await User.findOne({
                    where:{email}
                });
                res.status(200).json({ user });

            } else if (id !== '') {
                
                const users = await User.findByPk(id);
                res.status(200).json({ users });

            } else {

                res.status(200).json({ error: 'Informe um email' });  
                
            }
        } catch (error) {
            console.error(error);
            return res.status(501).json({ error:error.message });   
        }
    },

    delete: async (req, res) => {
        try {
            
            const { user } = req;
            const userToDelete = await User.findByPk(user.user_id);

            if (!userToDelete) {
                res.status(200).json({ error: 'Usuário não encontrado' });
            }

            const result = await userToDelete.destroy();

            res.status(200).json({ result });

        } catch (error) {
            console.error(error);
            return res.status(501).json({ error:error.message });   
        }
    },

};