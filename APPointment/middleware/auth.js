const { User } = require('../models');
module.exports = {
  
    validate: async (req, res, next) => {
        try {
            const conectedUser = await User.findByPk(1, {
                attributes:['admin', 'id']
            });
            req.user = { user_id: conectedUser.id, admin };
            if (!conectedUser) {
                throw new Error('Usuário não conectado');
            }
            next();
        } catch (error) {
            console.error(error);
            return res.status(501).json({ error:error.message });
        }
    }
    
};