const { Router } = require('express');
const { getCategorias,addCategoria
    } = require('../controllers/categoriasController');
const router = Router();
router.get('/allcategorias', getCategorias);
router.post('/addcategoria', addCategoria);
module.exports = router;