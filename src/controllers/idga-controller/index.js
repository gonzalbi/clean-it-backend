const express = require('express')
const router = express.Router()

const idgaController = require('./idga-controller')

router.get('/',(req,res)=> {
    res.send('IDGAController')
})
router.get('/getLocationData', idgaController.getLocationData)
router.get('/getOperations/:opid',idgaController.getOperations)
router.post('/addLocation',idgaController.addLocation)
router.post('/addSector',idgaController.addSector)
router.post('/addSubsector',idgaController.addSubsector)
router.post('/saveOperationData', idgaController.saveOperationData)
router.get('/getOperationData/:opid', idgaController.getOperationData)



module.exports = router
