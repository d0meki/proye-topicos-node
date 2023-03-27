const  { Router } = require('express');
const { pruebaChatGpt,getAlgo } = require('../controllers/openIAController');
const router = Router();

router.post('/',pruebaChatGpt);

router.get('/get-algo',getAlgo);

module.exports = router;