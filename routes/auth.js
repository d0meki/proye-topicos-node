const  { Router } = require('express');
const { login,registrarUsuario,verificarCi,verificarFoto,changePassword,signOut} = require('../controllers/authController');

const router = Router();

router.post('/login-user',login);
router.post('/register-user',registrarUsuario);
router.post('/verificar-ci',verificarCi);
router.post('/verificar-foto',verificarFoto);
router.post('/change-password',changePassword);
router.post('/logout',signOut);

module.exports = router;
