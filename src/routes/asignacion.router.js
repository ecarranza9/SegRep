const express = require('express');
const router = express.Router();
const asignacionController = require('../controllers/asignacion.controller')

const { isAuthenticated }  = require('../helpers/auth');



router.get('/', isAuthenticated, asignacionController.getAsignacion)
router.get('/:id', isAuthenticated, asignacionController.asignacionData)



















module.exports = router;