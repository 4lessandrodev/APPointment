const { User } = require('./../models');

module.exports = {

    index: async (req, res) => {
        try {
            const users = await User.findAll();
            res.status(200).json({ users });   
        } catch (error) {
            console.error(error);
        }
    }

};