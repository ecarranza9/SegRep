const express = require('express');
const router = express.Router();
const cierreController = require('../controllers/cierre.controlller');
const multipart = require('connect-multiparty')
const multipartMiddleware = multipart({uploadDir:'./src/uploads'});
const { isAuthenticated }  = require('../helpers/auth');


router.get('/', isAuthenticated, cierreController.getCierre)
router.get('/detalle/:id', isAuthenticated, cierreController.detalleCierre)
router.post('/upload/:id', isAuthenticated, multipartMiddleware, cierreController.cierreUploadFile)
router.get('/upload/:reporte', isAuthenticated, cierreController.cierreDownReporte)









module.exports = router