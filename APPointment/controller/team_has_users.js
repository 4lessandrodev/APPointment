const { Team_has_users, Team, User } = require('../models');


module.exports = {
    
    store: async (req, res) => {
        try {
            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            
            const { user } = req;

            const teamAvaliable = await Team.findOne({ where: { teams_id, manager: user.user_id } });
            
            if (!teamAvaliable) {
                return res.status(422).json({ error:'Você não tem autorização para remover este usuário' });
            }

            const userAvaliable = await User.findByPk(users_id);

            if (!teamAvaliable || !userAvaliable) {
                return res.status(422).json({ error:'Usuário ou time não disponível' });
            }

            const result = await Team_has_users.create({ teams_id, users_id });
            res.status(200).json({ result });
            
        } catch (error) {
            console.error(error.message);
            return res.status(501).json({ error:error.message });
        }
    },
    
    delete: async (req, res) => {
        try {
            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            
            const { user } = req;

            const teamAvaliable = await Team.findOne({ where: { teams_id, manager: user.user_id } });
            
            if (!teamAvaliable) {
                return res.status(422).json({ error:'Você não tem autorização para remover este usuário' });
            }

            const result = await Team_has_users.destroy({where:{teams_id, users_id}});
            res.status(200).json({ result });
            
        } catch (error) {
            console.error(error.message);
            return res.status(501).json({ error:error.message });
        }
    }
    
};