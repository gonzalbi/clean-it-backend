
const Location = require("../models/Location");
const Sector = require("../models/Sector");
const SubSector = require("../models/SubSector");
const Operation = require("../models/Operation");
const Inspection = require("../models/Inspection")
const moment = require('moment')
const idgaService = require('../services/idga-service')

const formatInspections = (data) => {
    let inspections = []

    for(let operation of data){
        inspections.push(
            new Inspection(operation.idoperacion,null,operation.op_score,operation.op_img_path,operation.op_date)
        )

    }
    return inspections;
}
const mapLocationData = async () => {
    const data = await idgaService.getAll()

    let retData = [];
    for (let item of data) {

        if (location = retData.find(location => location.getId() == item.id_location)) {
            if (sector = location.getSectors().find(sector => sector.getId() == item.id_sector)) {
                let subsect = item.id_subsector ? new SubSector(item.id_subsector, item.subsector_name) : null
                sector.addSubSector(subsect)
                continue
            }
            let subsect = item.id_subsector ? new SubSector(item.id_subsector, item.subsector_name) : null
            let sect = item.id_sector ? new Sector(item.id_sector, item.sector_name, subsect) : null
            location.Sectors.push(sect)
            continue
        }

        let newSubsector = item.id_subsector ? new SubSector(item.id_subsector, item.subsector_name, null) : null
        let newSector = item.id_sector ? new Sector(item.id_sector, item.sector_name, newSubsector) : null
        let newLocation = new Location(item.id_location, item.location_name, newSector)

        retData.push(newLocation)

    }

    return retData
}
const handleInspections = async (data,files) => {
    let inspections = [];
    const date = moment().format("YYYY-MM-DD")

    for(let i = 0; i < files.length; i++){
        inspections.push(
            new Inspection(data.operationId[i], data.operationName[i], data.score[i], files[i],date)
        )
    }
    try{    
        await idgaService.saveInspections(inspections)
        return true
    }catch (e){
        console.log(e);
    }
}
const mapOperations = async (subSecId) => {
    var data = await idgaService.getOperationById(subSecId)
    let operations = []
    for (let operation of data) {
        operations.push(new Operation(operation.id_operation, operation.name))
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

const getInspections = async (opid) => {
    try {
        const opid = req.params.opid;
        return formatInspections(await idgaService.getInspectionById(opid))
    } catch (err) {
        console.log(err)
    }
}

const checkInspection = async (subSecId) => {
    try{
        const date = moment().format("YYYY-MM-DD")
        const data = await idgaService.getTodayInspection(subSecId,date)
       return data
    }catch (e) {
        console.log(e)
    }
}

const getLocations = async () => {
    try {
        
        const locationsResponse = await idgaService.getLocations()
        const locations = []
        for(const location of locationsResponse){
            locations.push(new Location(location.id_location,location.name))
        }

        return locations
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getInspections,
    mapLocationData,
    handleInspections,
    mapOperations,
    addLocation,
    addSector,
    addSubsector,
    checkInspection,
    getLocations
}