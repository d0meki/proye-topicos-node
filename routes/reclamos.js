const  { Router } = require('express');
const { getReclamos,getReclamoPorFecha,getReclamoPorEstado,getReclamoPorCategoria} = require('../controllers/reclamoController');

const router = Router();

router.post('/reclamos',getReclamos);
router.post('/reclamos-fecha',getReclamoPorFecha);
router.post('/reclamos-estado',getReclamoPorEstado);
router.post('/reclamos-categoria',getReclamoPorCategoria);

module.exports = router;
