const { Router } = require('express');
const { addFuncionario,
    loginFuncionario,
    getFuncionario } = require('../controllers/funcionarioController');
const router = Router();
router.post('/login-funcionario', loginFuncionario);
router.post('/register-funcionario', addFuncionario);
router.get('/getFuncionario-id', getFuncionario);

module.exports = router;
