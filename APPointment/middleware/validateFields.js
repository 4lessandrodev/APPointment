const { check, param } = require('express-validator');
module.exports = {
    
    validateUser: () => {
        return (
            [
                check('email', 'Informe um email válido').isEmail(),
                check('password', 'Informe uma senha').isLength({ min: 1, max: 10 }),
                check('email', 'Email deve ser menor que 80 caracter').isLength({ max: 80 })
            ]
        );
    },
        
    validateTeam: () => {
        return (
            [
                check('description', 'Informe um nome para o time de até 80 caracter').isLength({ min: 1, max: 80 })
            ]
        );
    },
            
    validateNewTask: () => {
        return (
            [
                check('start_at', 'Informe uma data de início').isISO8601(),
                check('description', 'Informe um nome para o time de até 80 caracter').isLength({ min: 1, max: 120 }),
                check('email', 'Email deve ser menor que 80 caracter').isLength({ max: 80 })
            ]
        );
    },

    validateUpdateTask: () => {
        return (
            [
                check('start_at', 'Informe uma data de início').isISO8601(),
                check('description', 'Informe um nome para o time de até 80 caracter').isLength({ min: 1, max: 120 }),
                check('email', 'Email deve ser menor que 80 caracter').isLength({ max: 80 }),
                check('done', 'Informe se a tarefa foi concluída').isBoolean(),
                check('done_at', 'informe a data atual como horario de conclusão').isISO8601(),
            ]
        );
    },

    validateParam: () => {
        return (
            [
                param('id', 'Informe um id numérico').isNumeric()
            ]
        );
    }
                
};