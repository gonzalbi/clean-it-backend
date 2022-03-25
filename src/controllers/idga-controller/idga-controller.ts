
const idgaHandler  = require('../../handler/idga-handler');

const getLocationData = async (req, res) => {
    try {
        res.send(await idgaHandler.mapLocationData())
    } catch (err) {
        console.log(err)
    }
};


const getOperations = async (req, res) => {
    
    try {
        const subSecId = req.params.subSecId ? req.params.subSecId : null;
        res.send(await idgaHandler.mapOperations(subSecId))
    } catch (err) {
        res.status(500).send(`Internal Error: ${err}`)
        console.log(err)
    }
};

const saveInspection = async (req, res) => {
    try {
        const resp = idgaHandler.saveInspections(req.body, req.files.map(x => x.filename))
        
        if(resp){
            res.status(200).send('Operation saved')
        }else{
        res.status(500).send()
        }
        

    } catch (err) {
        res.status(500).send(`Internal Error: ${err}`)
    }
}


const addLocation = async (req, res) => {
    try {
        await idgaHandler.addLocation(req.body.locationName)

        res.status(200).send('Location Created')
    } catch (err) {
        console.log(err)
        res.status(500).send(`Internal Error: ${err}`)
    }
}

const addSector = async (req, res) => {
    try {
        const locationId = req.params.locationId;
        await idgaHandler.addSector(req.body.sectorName,locationId)

        res.status(200).send('Sector Created')
    } catch (err) {
        console.log(err)
        res.status(500).send(`Internal Error: ${err}`)
    }
}

const addSubsector = async (req, res) => {
    try {
        const sectorId = req.params.sectorId;
        await idgaHandler.addSubsector(req.body.subsectorName,sectorId)

        res.status(200).send('Sector Created')
    } catch (err) {
        console.log(err)
        res.status(500).send(`Internal Error: ${err}`)
    }
}

const addOperation = async (req, res) => {
    try {
        const subsectorId = req.params.subsectorId;
        await idgaHandler.addOperation(req.body.operationName,subsectorId)

        res.status(200).send('Sector Created')
    } catch (err) {
        console.log(err)
        res.status(500).send(`Internal Error: ${err}`)
    }
}

const getInspection = async (req, res) => {
    try {
        const opid = req.params.opid;
        const response = await idgaHandler.getInspections(opid)

        res.status(200).send(response)
    } catch (err) {
        console.log(err)
        res.status(500).send(`Internal Error: ${err}`)
    }
}


const checkInspection = async (req, res) => {
    const subSecId = req.params.subSecId ? req.params.subSecId : null;

    try{
        const data = await idgaHandler.checkInspection(subSecId)
        res.status(200).send(data)
    }catch (e) {
        console.log(e)
        res.status(500).send(`Internal Error: ${e}`)
    }
}

const getLocations = async (req,res) => {
    try{
        const data = await idgaHandler.getLocations()
        res.status(200).send(data)
    }catch (e) {
        console.log(e)
        res.status(500).send(`Internal Error: ${e}`)
    }
}

const getOperatorsBySector = async (req,res) => {
    const id_sector = req.params.sectorId
    const response = await idgaHandler.getOperatorsBySector(id_sector)

    res.status(200).send(response)
}

module.exports = {
    getLocationData,
    getOperations,
    saveInspection,
    addLocation,
    addSector,
    addSubsector,
    addOperation,
    getInspection,
    checkInspection,
    getLocations,
    getOperatorsBySector
}