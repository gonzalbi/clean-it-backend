const express = require('express');
const router = express.Router();

const idgaController = require('../controllers/idga-controller');

router.use('/', idgaController);
module.exports = router;