const  { Router } = require('express');
const { getReclamos,getReclamoPorFecha,getReclamoPorEstado,getReclamoPorCategoria} = require('../controllers/reclamoController');

const router = Router();

router.get('/reclamos',getReclamos);
router.get('/reclamos-fecha',getReclamoPorFecha);
router.get('/reclamos-estado',getReclamoPorEstado);
router.get('/reclamos-categoria',getReclamoPorCategoria);

module.exports = router;
