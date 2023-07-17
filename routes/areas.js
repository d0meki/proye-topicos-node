const { Router } = require('express');
const { getAreas,addArea,editarArea,eliminarArea,getArea
    } = require('../controllers/areaController');
const router = Router();
router.get('/allareas', getAreas);
router.post('/addarea', addArea);
router.post('/editar_area', editarArea);
router.post('/eliminar_area', eliminarArea);
router.get('/area-id/:id', getArea);


module.exports = router;