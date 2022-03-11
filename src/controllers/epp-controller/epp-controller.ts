
import * as eppHandler from '../../handler/epp-handler'

const getOperatorsBySector = async (req, res) => {
    try {
        const locationId = req.params.locationId
        
        if(!locationId) res.status(400).send()

        const response = await eppHandler.getOperatorsBySector(locationId)
        res.status(200).send(response)
    } catch (err) {
        console.log(err)
    }
};

const getEPPZip = async (req,res) => {
    const sectorId = req.params.sectorId
    const file_path = eppHandler.getEppFile(sectorId)

    res.download(file_path,'EPP.zip',function(err){
        if(err) console.log(err)
    })
}

const getentregaRopaZip = async (req,res) => {

    const sectorId = req.params.sectorId
    const file_path = eppHandler.getEntregaRopaFile(sectorId)

    res.download(file_path,'Entrega de Ropa.zip',function(err){
        if(err) console.log(err)
    })
}

export {
    getOperatorsBySector,
    getentregaRopaZip,
    getEPPZip
}