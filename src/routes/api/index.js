const express = require('express');
const router = express.Router();

const idgaController = require('../../controllers/idga-controller');
const eppController = require('../../controllers/epp-controller')

router.use('/idga/', idgaController);
router.use('/epp/',eppController)

module.exports = router;