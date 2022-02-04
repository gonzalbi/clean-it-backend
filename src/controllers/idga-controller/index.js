const express = require('express')
const router = express.Router()
const multer = require('multer')
const moment = require('moment')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/assets/img')
    },
    filename: function (req, file, cb) {
        let filename = file.originalname.split('.')
        filename = filename[0]+ '-' + moment().format("YYYY-MM-DD")+'.'+filename[1]

      cb(null,  filename)
    }
  })

const upload = multer({storage : storage})

const idgaController = require('./idga-controller')

router.get('/getLocationData', idgaController.getLocationData)
router.get('/getOperations/:subSecId',idgaController.getOperations)
router.get('/checkOperation/:subSecId',idgaController.checkOperationData)
router.post('/addLocation',idgaController.addLocation)
router.post('/addSector',idgaController.addSector)
router.post('/addSubsector',idgaController.addSubsector)
router.post('/saveOperationData',upload.array('files'), idgaController.saveOperationData)
router.get('/getOperationData/:opid', idgaController.getOperationData)



module.exports = router
