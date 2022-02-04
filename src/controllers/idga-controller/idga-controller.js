
const idgaHandler  = require('../../handler/idga-handler');

const getLocationData = async (req, res, next) => {
    try {
        res.send(await idgaHandler.mapLocationData())
    } catch (err) {
        console.log(err)
    }
};

const getOperations = async (req, res, next) => {
    
    try {
        const subSecId = req.params.subSecId ? req.params.subSecId : null;
        res.send(await idgaHandler.mapOperations(subSecId))
    } catch (err) {
        console.log(err)
    }
};

const saveOperationData = async (req, res, next) => {
    try {
        idgaHandler.handleOperationData(req.body, req.files.map(x => x.filename))

        res.status(200).send('Operation saved')
    } catch {
        res.status(500).send(`Internal Error: ${err}`)
    }
}


const addLocation = async (req, res, next) => {
    try {

        let response = await idgaHandler.addLocation(req.body)

        res.status(200).send('Location Created')
    } catch (err) {
        console.log(err)
        res.status(500).send(`Internal Error: ${err}`)
    }
}

const addSector = async (req, res, next) => {
    try {
        await idgaHandler.addSector(req.body)

        res.status(200).send('Sector Created')
    } catch (err) {
        console.log(err)
        res.status(500).send(`Internal Error: ${err}`)
    }
}

const addSubsector = async (req, res, next) => {
    try {
        await idgaHandler.addSubsector(req.body)

        res.status(200).send('Sector Created')
    } catch (err) {
        console.log(err)
        res.status(500).send(`Internal Error: ${err}`)
    }
}

const getOperationData = async (req, res, next) => {
    try {
        const opid = req.params.opid;
        let response = await idgaHandler.getOperationData(opid)

        res.status(200).send(response)
    } catch (err) {
        console.log(err)
        res.status(500).send(`Internal Error: ${err}`)
    }
}


const checkOperationData = async (req, res, next) => {
    const subSecId = req.params.subSecId ? req.params.subSecId : null;

    try{
        const data = await idgaHandler.checkOperationData(subSecId)
        res.status(200).send(data)
    }catch (e) {
        console.log(e)
        res.status(500).send(`Internal Error: ${err}`)
    }
}


module.exports = {
    getLocationData,
    getOperations,
    saveOperationData,
    addLocation,
    addSector,
    addSubsector,
    getOperationData,
    checkOperationData
}