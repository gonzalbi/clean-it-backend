import express from 'express'
const router = express.Router()
import * as eppController from './epp-controller'

router.get('/getOperatorsBySector/:locationId', eppController.getOperatorsBySector)
router.get('/entregaRopaZip/:sectorId',eppController.getentregaRopaZip)
router.get('/entregaEPPZip/:sectorId', eppController.getEPPZip)


module.exports = router
