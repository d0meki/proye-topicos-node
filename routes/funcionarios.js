const { Router } = require('express');
const { addFuncionario,
    loginFuncionario,
    getFuncionario,getFuncionarios } = require('../controllers/funcionarioController');
const router = Router();
router.post('/login-funcionario', loginFuncionario);
router.post('/register-funcionario', addFuncionario);
router.get('/getFuncionario-id', getFuncionario);
router.get('/getallfuncionario', getFuncionarios);

module.exports = router;
