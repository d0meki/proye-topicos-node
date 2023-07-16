const { Router } = require('express');
const { getAreas,addArea,editarArea,eliminarArea
    } = require('../controllers/areaController');
const router = Router();
router.get('/allareas', getAreas);
router.post('/addarea', addArea);
router.post('/editar_area', editarArea);
router.post('/eliminar_area', eliminarArea);

module.exports = router;