const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller')
const { isAuthenticated }  = require('../helpers/auth');


router.get('/reporte', isAuthenticated, adminController.getAllPedidos)
router.get('/asignacion', isAuthenticated, adminController.getAdminAsignaciones)
router.get('/asignacion/:id', isAuthenticated, adminController.deleteAdminAsignaciones)
router.get('/cierre', isAuthenticated, adminController.getAdminCierres)
router.get('/cierre/:id', isAuthenticated, adminController.deleteAdminCierres)






module.exports = router