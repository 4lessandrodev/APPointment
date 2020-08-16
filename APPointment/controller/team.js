const { Team, User } = require('../models');

module.exports = {

    index: async (req, res) => {
        try {
            const { user } = req;
            let teams;
            if (user.admin) {
                teams = await Team.findAll(
                    {
                        include: [
                            {
                                model: User,
                                as: 'team_users',
                                required:true,
                            }
                        ],
                        where: {
                           manager:user.user_id 
                        }
                    }
                );                
            } else {
                teams = await Team.findAll(
                    {
                        include: [
                            {
                                model: User,
                                as: 'team_users',
                                required: true,
                                where: {
                                    id:user.user_id 
                                 }
                            }
                        ]
                    }
                );
            }

            return res.status(200).json({ teams });

        } catch (error) {
            console.error(error);
            return res.status(501).json({ error:error.message }); 
        }
    },

    store: async (req, res) => {
        try {
            const { user } = req;

            if (!user.admin) {
                return res.status(401).json({ error:'Você não tem autorização para criar uma equipe' }); 
            }

            const { description } = req.body;
            const result = await Team.create({ description, manager:user.user_id });
            return res.status(200).json({ result });

        } catch (error) {
            console.error(error);
            return res.status(501).json({ error:error.message });
        }
    },

    update: async (req, res) => {
        try {
            
            const { description } = req.body;
            const { id } = req.params;
            const team = await Team.findOne({
                where: {
                    id,
                    manager:user.user_id
                }
            });
            if (!team) {
                return res.status(401).json({ error:'Time não encontrado ou falta de autorização' });
            }
            team.description = description;
            const result = await team.save();
            return res.status(200).json({ result });

        } catch (error) {
            console.error(error);
            return res.status(501).json({ error:error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const team = await Team.findOne({
                where: {
                    id,
                    manager:user.user_id
                }
            });
            if (!team) {
                return res.status(401).json({ error:'Time não encontrado ou falta de autorização' });
            }
            const result = await team.destroy();
            return res.status(200).json({ result });
        } catch (error) {
            console.error(error);
            return res.status(501).json({ error:error.message });
        }
    },

    show: async (req, res) => {
        try {
            let team;
            const { id } = req.params;
            if (user.admin) {
                team = await Team.findAll(
                    {
                        include: [
                            {
                                model: User,
                                as: 'team_users',
                                required:true,
                            }
                        ],
                        where: {
                           id,
                           manager:user.user_id 
                        }
                    }
                );                
            } else {
                team = await Team.findAll(
                    {
                        include: [
                            {
                                model: User,
                                as: 'team_users',
                                required: true,
                                where: {
                                    id:user.user_id 
                                 }
                            }
                        ],
                        where: {
                         id,
                         }
                    }
                );
            }

            return res.status(200).json({ team });

        } catch (error) {
            console.error(error);
            return res.status(501).json({ error:error.message });
        }
    }


};