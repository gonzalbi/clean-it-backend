const express = require('express')
const router = express.Router()
const eppController = require('./epp-controller')

router.get('/getEPPInfo/:locationId', eppController.getEPPInfo)

module.exports = router
