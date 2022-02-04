
const Location = require("../models/Location");
const Sector = require("../models/Sector");
const SubSector = require("../models/SubSector");
const Operation = require("../models/Operation");
const OperationData = require("../models/OperationData")
const moment = require('moment')
const idgaService = require('../services/idga-service')

const formatOperationData = (data) => {
    let operationData = []

    for(let operation of data){
        operationData.push(
            new OperationData(operation.idoperacion,null,operation.op_score,operation.op_img_path,operation.op_date)
        )

    }
    return operationData;
}
const mapLocationData = async () => {
    const data = await idgaService.getAll()

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
const handleOperationData = async (data,files) => {
    let operationData = [];
    const date = moment().format("YYYY-MM-DD")
    console.log(data)

    for(let i = 0; i < files.length; i++){
        operationData.push(
            new OperationData(data.operationId[i], data.operationName[i], data.score[i], files[i],date)
        )
    }
    try{    
        await idgaService.saveOperationData(operationData)
        return true
    }catch (e){
        console.log(e);
    }
}
const mapOperations = async (subSecId) => {
    var data = await idgaService.getOperationById(subSecId)
    let operations = []
    for (let operation of data) {
        operations.push(new Operation(operation.idoperacion, operation.name))
    }

    return operations
}

const addLocation = async (data) => {
    try {
        let locationName = data.name
        let locationId = data.id ? data.id : null
        let response = await idgaService.addLocation(locationId, locationName)

        return true
    } catch (err) {
        console.log(err)
    }
}


const addSector = async (data) => {
    try {
        let locationId = data.parentId
        let sectorName = data.name
        await idgaService.addSector(null, sectorName, locationId)

        return true
    } catch (err) {
        console.log(err)
    }
}

const addSubsector = async (data) => {
    try {
        let sectorid = data.parentId
        let subsectorName = data.name
        await idgaService.addSubsector(null, subsectorName, sectorid)

        return true
    } catch (err) {
        console.log(err)
    }
}

const getOperationData = async (opid) => {
    try {
        const opid = req.params.opid;
        return formatOperationData(await idgaService.getOperationDataById(opid))
    } catch (err) {
        console.log(err)
    }
}

const checkOperationData = async (subSecId) => {
    try{
        const date = moment().format("YYYY-MM-DD")
        const data = await idgaService.getTodayOperationData(subSecId,date)
       return data
    }catch (e) {
        console.log(e)
    }
}

module.exports = {
    getOperationData,
    mapLocationData,
    handleOperationData,
    mapOperations,
    addLocation,
    addSector,
    addSubsector,
    checkOperationData
}