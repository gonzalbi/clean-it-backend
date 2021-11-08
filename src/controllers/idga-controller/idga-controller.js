const Location = require("../../models/Location");
const Sector = require("../../models/Sector");
const SubSector = require("../../models/SubSector");
const Operation = require("../../models/Operation");
const OperationData = require("../../models/OperationData")

const service = require('../../services/idga-service');

const getLocationData = async (req, res, next) => {
    try {
        var data = await service.getAll()
        res.send(mapLocationData(data))
    } catch (err) {
        console.log(err)
    }
};

const getOperations = async (req, res, next) => {
    const subsecid = req.params.opid;
    try {
        var data = await service.getOperationById(subsecid)
        let operations = []
        for (let operation of data) {
            operations.push(new Operation(operation.idoperacion, operation.name))
        }

        res.send(operations)
    } catch (err) {
        console.log(err)
    }
};

const saveOperationData = async (req, res, next) => {
    try {
        handleOperationData(req.body, req.files.map(x => x.filename))

        res.status(200).send('Operation saved')
    } catch {
        res.status(500).send(`Internal Error: ${err}`)
    }
}

const addLocation = async (req, res, next) => {
    try {
        let body = req.body
        let locationName = body.name
        let locationId = body.id ? body.id : null
        let response = await service.addLocation(locationId, locationName)

        res.status(200).send('Location Created')
    } catch (err) {
        console.log(err)
        res.status(500).send(`Internal Error: ${err}`)
    }
}

const addSector = async (req, res, next) => {
    try {
        let body = req.body
        let locationId = body.parentId
        let sectorName = body.name
        await service.addSector(null, sectorName, locationId)

        res.status(200).send('Sector Created')
    } catch (err) {
        console.log(err)
        res.status(500).send(`Internal Error: ${err}`)
    }
}

const addSubsector = async (req, res, next) => {
    try {
        let body = req.body
        let sectorid = body.parentId
        let subsectorName = body.name
        await service.addSubsector(null, subsectorName, sectorid)

        res.status(200).send('Sector Created')
    } catch (err) {
        console.log(err)
        res.status(500).send(`Internal Error: ${err}`)
    }
}

const getOperationData = async (req, res, next) => {
    try {
        const opid = req.params.opid;
        let response = formatOperationData(await service.getOperationDataById(opid))

        res.status(200).send(response)
    } catch (err) {
        console.log(err)
        res.status(500).send(`Internal Error: ${err}`)
    }
}

const mapLocationData = (data) => {
    let retData = [];
    for (let item of data) {

        if (location = retData.find(x => x.getId() == item.idlocacion)) {
            if (sector = location.getSectors().find(x => x.getId() == item.idsector)) {
                let subsect = item.idsubsector ? new SubSector(item.idsubsector, item.subsector_name) : null
                sector.addSubSector(subsect)
                continue
            }
            let subsect = item.idsubsector ? new SubSector(item.idsubsector, item.subsector_name) : null
            let sect = item.idsector ? new Sector(item.idsector, item.sector_name, subsect) : null
            location.Sectors.push(sect)
            continue
        }

        let newSubsector = item.idsubsector ? new SubSector(item.idsubsector, item.subsector_name, null) : null
        let newSector = item.idsector ? new Sector(item.idsector, item.sector_name, newSubsector) : null
        let newLocation = new Location(item.idlocacion, item.locacion_name, newSector)

        retData.push(newLocation)

    }
    return retData
}

const formatOperationData = (data) => {

    let operationData = []

    for(let operation of data){
        operationData.push(
            new OperationData(operation.idoperacion,null,operation.op_score,operation.op_img_path,operation.op_date)
        )

    }
    return operationData;
}

const handleOperationData = async (data,files) => {

    let operationData = [];

    for(let i = 0; i < files.length; i++){
        operationData.push(
            new OperationData(data.operationId[i], data.operationName[i], data.score[i], files[i])
        )
    }
    try{    
        await service.saveOperationData(operationData)
        return true
    }catch (e){
        console.log(e);
    }
}


module.exports = {
    getLocationData,
    getOperations,
    saveOperationData,
    addLocation,
    addSector,
    addSubsector,
    getOperationData
}