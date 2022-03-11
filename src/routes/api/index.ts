import express from 'express';
const router = express.Router();

const idgaController = require('../../controllers/idga-controller');
const eppController = require('../../controllers/epp-controller')
const capacitationController = require('../../controllers/capacitation-controller')

router.use('/idga/', idgaController);
router.use('/epp/',eppController);
router.use('/capacitations/',capacitationController)

module.exports = router;