const express = require('express');
const router = express.Router();
const tecnicoController = require('../controllers/tecnico.controller')
const { isAuthenticated }  = require('../helpers/auth');


router.get('/',isAuthenticated, tecnicoController.getTecnico)
router.post('/nuevo', isAuthenticated, tecnicoController.addTecnico)
router.get('/:id', isAuthenticated, tecnicoController.borrarTecnico)
















module.exports = router;