const { Task, User, Team } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    
    index: async (req, res) => {
        try {
            
            let tasks;
            const { user_id } = req.user;
            const conectedUser = await User.findByPk(user_id);
            
            if (conectedUser.admin) {
                const teams = await Team.findAll({
                    include: [
                        {
                            model: User,
                            as: 'team_users',
                            required:true
                        }
                    ],
                    where: {
                        manager:user_id
                    }
                });

                const users = teams.map(team => team.team_users);
                const ids = [...users];

                tasks = await Task.findAll({
                    include: [
                        {
                            model: User,
                            as: 'users',
                            required:true
                        }
                    ],
                    where: {
                        users_id:{[Op.in]:ids}
                    }
                });
             
            } else {
                tasks = await Task.findAll({
                    include: [
                        {
                            model: User,
                            as: 'users_task',
                            required:true
                        }
                    ],
                    where: {
                        users_id: user_id
                    }
                });
            }
            
            return res.status(200).json(tasks);
            
        } catch (error) {
            console.error(error);
            return res.status(501).json({ error:error.message });
        }
    },
    
    store: async (req, res) => {
        try {
            const { startat, description } = req.body;
            const { user_id } = req.user;
            const result = await Task.create({ startat, description, users_id: user_id });
            return res.status(200).json(result);
        } catch (error) {
            console.error(error);
            return res.status(501).json({ error:error.message });
        }
    },
    
    update: async (req, res) => {
        try {
            const { startat, description, done, doneat } = req.body;
            const { id } = req.params;
            const { user_id } = req.user;
            
            const task = await findByPk(id);
            if (!task) {
                return res.status(422).json({ error:`Não foi encontrada a tarefa para o id: ${id}` });  
            }
            
            if (task.users_id != user_id) {
                return res.status(422).json({ error:`Você não tem autorização para alterar esta tarefa` }); 
            }
            
            task.description = description;
            task.startat = startat;
            task.done = done;
            task.doneat = doneat;
            const result = await task.save();
            
            return res.status(200).json(result);
            
        } catch (error) {
            console.error(error);
            return res.status(501).json({ error:error.message });
        }
    },
    
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const { user_id } = req.user;
            
            const task = await findByPk(id);
            if (!task) {
                return res.status(422).json({ error:`Não foi encontrada a tarefa para o id: ${id}` });  
            }
            
            if (task.users_id != user_id) {
                return res.status(422).json({ error:`Você não tem autorização para alterar esta tarefa` }); 
            }
            
            const result = await task.destroy();
            return res.status(200).json(result);
            
        } catch (error) {
            console.error(error);
            return res.status(501).json({ error:error.message });
        }
    },

    show: async (req, res) => {
        try {
            const { id } = req.params;
            const { user_id } = req.user;
            const task = await Task.findOne({
                where: {
                    id,
                    users_id: user_id,
                }
            });

            return res.status(200).json(task);

        } catch (error) {
            console.error(error);
            return res.status(501).json({ error:error.message }); 
        }
    }
    
};