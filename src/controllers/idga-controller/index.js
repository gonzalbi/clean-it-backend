const express = require('express')
const router = express.Router()

const idgaController = require('./idga-controller')

router.get('/',(req,res)=> {
    res.send('IDGAController')
})
router.get('/getLocationData', idgaController.getLocationData)
router.get('/getOperations/:opid',idgaController.getOperations)


module.exports = router
