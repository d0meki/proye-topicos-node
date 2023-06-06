const  { Router } = require('express');
const { getPrueba,visionPrueba } = require('../controllers/googleVisionController');
const router = Router();

/* router.post('/',chatGptDavinci);
router.post('/turbo',chatGptTurbo); */

router.get('/get-prueba',getPrueba);
router.post('/reconocer',visionPrueba);

module.exports = router;