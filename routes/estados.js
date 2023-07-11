const { Router } = require('express');
const { getEstados,addEstado
    } = require('../controllers/estadosController');
const router = Router();
router.get('/allestados', getEstados);
router.post('/addestado', addEstado);
module.exports = router;