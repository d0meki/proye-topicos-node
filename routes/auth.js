const  { Router } = require('express');
const { login,register,verificarCI,verificarFoto,bloquearUsuario,getListaUsuarios} = require('../controllers/authController');

const router = Router();

router.post('/login',login);
router.post('/register',register);
router.post('/verificar-ci',verificarCI);
router.post('/verificar-foto',verificarFoto);
router.post('/bloquear-usuario',bloquearUsuario);
router.get('/get-list-user',getListaUsuarios);

module.exports = router;
