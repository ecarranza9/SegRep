const express = require('express');
const router = express.Router();
const asignacionController = require('../controllers/asignacion.controller')



router.get('/', asignacionController.getAsignacion)
router.get('/:id', asignacionController.asignacionData)



















module.exports = router;