const express = require('express');
const router = express.Router();
const cierreController = require('../controllers/cierre.controlller');
const multipart = require('connect-multiparty')
const multipartMiddleware = multipart({uploadDir:'./src/uploads'});


router.get('/', cierreController.getCierre)
router.get('/detalle/:id', cierreController.detalleCierre)
router.post('/upload/:id', multipartMiddleware, cierreController.cierreUploadFile)
router.get('/upload/:reporte', cierreController.cierreDownReporte)









module.exports = router