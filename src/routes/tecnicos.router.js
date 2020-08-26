const express = require('express');
const router = express.Router();
const tecnicoController = require('../controllers/tecnico.controller')


router.get('/', tecnicoController.getTecnico)
router.post('/nuevo', tecnicoController.addTecnico)
router.get('/:id', tecnicoController.borrarTecnico)
















module.exports = router;