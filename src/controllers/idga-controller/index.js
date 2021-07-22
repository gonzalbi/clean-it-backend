const express = require('express')
const router = express.Router()
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './assets/img')
    },
    filename: function (req, file, cb) {
        let filename = file.originalname.split('.')
        filename = filename[0]+ '-' + Date.now()+'.'+filename[1]

      cb(null,  filename)
    }
  })

const upload = multer({storage : storage})

const idgaController = require('./idga-controller')

router.get('/',(req,res)=> {
    res.send('IDGAController')
})
router.get('/getLocationData', idgaController.getLocationData)
router.get('/getOperations/:opid',idgaController.getOperations)
router.post('/addLocation',idgaController.addLocation)
router.post('/addSector',idgaController.addSector)
router.post('/addSubsector',idgaController.addSubsector)
router.post('/saveOperationData',upload.array('files'), idgaController.saveOperationData)
router.get('/getOperationData/:opid', idgaController.getOperationData)



module.exports = router
