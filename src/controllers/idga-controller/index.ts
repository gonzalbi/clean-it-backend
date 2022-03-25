import express from 'express'
import multer from 'multer'
import moment from 'moment'
const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/assets/img')
    },
    filename: function (req, file, cb) {
        let filename = file.originalname.split('.')
        filename = moment().format("YYYY-MM-DD") + '-' + filename[0]+ '.'+filename[1]

      cb(null,  filename)
    }
  })

const upload = multer({storage})

const idgaController = require('./idga-controller')

router.get('/getLocationData', idgaController.getLocationData)
router.get('/getOperations/:subSecId',idgaController.getOperations)
router.get('/checkInspection/:subSecId',idgaController.checkInspection)
router.post('/addLocation',idgaController.addLocation)
router.post('/addSector/:locationId',idgaController.addSector)
router.post('/addSubsector/:sectorId',idgaController.addSubsector)
router.post('/addOperation/:subsectorId',idgaController.addOperation)
router.post('/saveInspection',upload.array('files'), idgaController.saveInspection)
router.get('/getInspection/:opid', idgaController.getInspection)
router.get('/getLocations',idgaController.getLocations)
router.get('/getOperatorsBySector/:sectorId',idgaController.getOperatorsBySector)


module.exports = router
