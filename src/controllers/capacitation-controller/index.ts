import express from 'express'
const router = express.Router()
import * as capacitationController from './capacitation-controller'


router.use('/getCapacitationInfo/:locationId', capacitationController.getCapacitationInfo)

module.exports = router
