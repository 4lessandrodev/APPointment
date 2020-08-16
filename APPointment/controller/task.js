const { Task, User, Team } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    
    index: async (req, res) => {
        try {
            let tasks;
            const { user } = req;
            
            
            if (user.admin) {
                const teams = await User.findAll({
                    include: [
                        {
                            model: Team,
                            as: 'team_users',
                            required: true,
                            where: {
                                manager:user.user_id
                            }
                        }
                    ],
                    
                });
                
                const usersIds = teams.map(user => user.id);
                
                tasks = await Task.findAll({
                    include: [
                        {
                            model: User,
                            as: 'users_task',
                            required:true
                        }
                    ],
                    where: {
                        users_id:{[Op.in]:usersIds}
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
                        users_id: user.user_id
                    }
                });
            }
            
            return res.status(200).json({ tasks });
            
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
            return res.status(200).json({ result });
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
            
            return res.status(200).json({ result });
            
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
            return res.status(200).json({ result });
            
        } catch (error) {
            console.error(error);
            return res.status(501).json({ error:error.message });
        }
    },
    
    show: async (req, res) => {
        try {
            const { id } = req.params;
            const { user } = req;
            let restricao = user.user_id;
            let ids;
            if (user.admin) {
                const teams = await User.findAll({
                    include: [
                        {
                            model: Team,
                            as: 'team_users',
                            required: true,
                            where: {
                                manager: user.user_id
                            }
                        }
                    ],
                    
                });
                
                ids = teams.map(user => user.id);
                restricao = { [Op.in]: ids };
            }

            const task = await Task.findOne({
                where: {
                    id,
                    users_id: restricao,
                }
            });
            
            if (!task) {
                return res.status(401).json({ error:'Não encontrada ou sem acesso à tarefa' }); 
            }
            
            return res.status(200).json({ task });
            
        } catch (error) {
            console.error(error);
            return res.status(501).json({ error:error.message }); 
        }
    }
    
};