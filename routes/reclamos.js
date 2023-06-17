const { Router } = require('express');
const { getReclamos,
    getReclamo,
    getReclamoPorFecha,
    getReclamoPorEstado,
    getReclamoPorCategoria,
    cambiarEstado,
    cambiarArea } = require('../controllers/reclamoController');

const router = Router();

router.get('/reclamos', getReclamos);
router.get('/reclamo-id', getReclamo);
router.get('/reclamos-fecha', getReclamoPorFecha);
router.get('/reclamos-estado', getReclamoPorEstado);
router.get('/reclamos-categoria', getReclamoPorCategoria);
router.post('/reclamos-update-estado-id', cambiarEstado);
router.post('/reclamo-change-area', cambiarArea);

module.exports = router;
