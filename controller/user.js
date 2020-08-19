const { User, Team, Team_has_users } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bcrypt = require('bcrypt');

module.exports = {

    index: async (req, res) => {
        try {
            const { user } = req;

            const teams = await Team.findAll({
                attributes:['id'],
                where:{manager:user.user_id}
            });

            const teamsIds = teams.map(team => team.id);

            const usersTeam = await Team_has_users.findAll({
                attributes:['users_id', 'teams_id'],
                where:{
                        teams_id:{[Op.in]:teamsIds}
                    }
            });

            const usersIds = usersTeam.map(user => user.users_id);

            const users = await User.findAll({
                include: [{
                    model: Team,
                    as: 'team_users',
                    required: true,
                }],
                where: {
                        id:{[Op.in]:usersIds}
                    }
            });

            res.status(200).json({ users });

        } catch (error) {
            console.error(error.message);
            return res.status(501).json({ error:error.message });   
        }
    },

    update: async (req, res) => {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            const { user } = req;
            let { name = '', email = '', password = '', admin = false } = req.body;

            password = (password != '') ? bcrypt.hashSync(password, 10) : '';
            admin = (user.admin) ? admin : false;
            name = (name !== '') ? name : 'username';

            const emailAlreadyExist = await User.findOne({ where: { email } });
            if (emailAlreadyExist) {
                return res.status(501).json({ error:'Este email já está em uso' }); 
            }
            const userToUpdate = await User.findByPk(user.user_id);

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
            console.error(error.message);
            return res.status(501).json({ error:error.message });   
        }
    },

    show: async (req, res) => {
        try {

            const { email = '', id = '', name = '' } = req.query;
            if (email !== '') {

                const user = await User.findOne({
                    where:{email:{[Op.like]:`%${email}%`}}
                });
                res.status(200).json({ user });

            } else if (id !== '') {
                
                const users = await User.findByPk(id);
                res.status(200).json({ users });

            }else if(name !== ''){

                 const user = await User.findOne({
                    where:{name:{[Op.like]:`%${name}%`}}
                });
                res.status(200).json({ user });

            } else {

                res.status(200).json({ error: 'Informe um email, name ou id' });  
                
            }
        } catch (error) {
            console.error(error.message);
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
            console.error(error.message);
            return res.status(501).json({ error:error.message });   
        }
    },

};