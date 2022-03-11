
import {Location} from "../models/Location"
import {Sector} from "../models/Sector";
import {SubSector} from "../models/SubSector";
import {Operation} from "../models/Operation";
import {Inspection} from "../models/Inspection"
import * as idgaService from  '../services/idga-service'
import moment from 'moment'



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

    const retData:Location[] = [];

    for (let item of data) {
        const location = retData.find(location => location.id_location == item.id_location)
        if (location) {
            const sector = location.Sectors.find(sector => sector.id_sector == item.id_sector)
            if (sector) {
                const subsect = item.id_subsector ? new SubSector(item.id_subsector, item.subsector_name) : null
                sector.Subsectors.push(subsect)
                continue
            }
            const subsect = item.id_subsector ? new SubSector(item.id_subsector, item.subsector_name) : null
            const sect = item.id_sector ? new Sector(item.id_sector, item.sector_name, subsect ? [subsect] : null) : null
            location.Sectors.push(sect)
            continue
        }

        let newSubsector = item.id_subsector ? new SubSector(item.id_subsector, item.subsector_name) : null
        let newSector = item.id_sector ? new Sector(item.id_sector, item.sector_name, newSubsector ? [newSubsector] : null) : null
        let newLocation = new Location(item.id_location, item.location_name, newSector ? [newSector] : null)

        retData.push(newLocation)

    }

    return retData
}


const saveInspections = async (data,files) => {
    let inspections = [];
    const date = moment().format("YYYY-MM-DD")

    for(let i = 0; i < files.length; i++){
        inspections.push(
            new Inspection(data.operationId[i],data.score[i],files[i],date)
        )
    }
    try{    
        await idgaService.saveInspection(inspections)
        return true
    }catch (e){
        console.log(e);
        return false
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
        let response = await idgaService.addLocation(locationName)

        return response ? true : false
    } catch (err) {
        console.log(err)
        return false
    }
}


const addSector = async (data) => {
    try {
        let locationId = data.parentId
        let sectorName = data.name
        await idgaService.addSector(sectorName, locationId)

        return true
    } catch (err) {
        console.log(err)
        return false
    }
}

const addSubsector = async (data) => {
    try {
        let sectorid = data.parentId
        let subsectorName = data.name
        await idgaService.addSubsector(subsectorName, sectorid)

        return true
    } catch (err) {
        console.log(err)
        return false
    }
}

const getInspections = async (opid) => {
    try {
        return formatInspections(await idgaService.getInspectionById(opid))
    } catch (err) {
        console.log(err)
        return false
    }
}

const checkInspection = async (subSecId) => {
    try{
        const date = moment().format("YYYY-MM-DD")
        const data = await idgaService.getTodayInspection(subSecId,date)
       return data
    }catch (e) {
        console.log(e)
        return false
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
        return []
    }
}

export {    
    getInspections,
    mapLocationData,
    saveInspections,
    mapOperations,
    addLocation,
    addSector,
    addSubsector,
    checkInspection,
    getLocations
}