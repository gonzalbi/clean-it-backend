//const config = require("config")
const db = require("../utils/database")
const logger = require('../utils/logger');

const getAll = async () => {
    let sql = 
    `
    select idlocacion,locacion_name,idsector,sector_name,idsubsector,subsector_name from locacion
    left join sector on locacion.idlocacion = sector.loc_id
    left join subsector on sector.idsector = subsector.sector_id
    `;

    try {		  
        const data = await db.query(sql);
        return data;
    } catch (err) {   
        logger.error('getAll:error', err);
        throw ({ errno: err.errno, code: err.code });
    }

}

const getOperationById = async(subsecid) => {
    let sql = 
    `
    select * from operacion
    where subsector_id = ${subsecid}
    `;

    try {		  
        const data = await db.query(sql);
        return data;
    } catch (err) {   
        logger.error('getOperationById:error', err);
        throw ({ errno: err.errno, code: err.code });
    }

}

const addLocation = async(locationid,locationName) => {

    let sql = 
    `insert into locacion (idlocacion,locacion_name) values (null,'${locationName}')`;

    try {		  
        const data = await db.query(sql);
        return data;
    } catch (err) {   
        logger.error('addLocation:error', err);
        throw ({ errno: err.errno, code: err.code });
    }
}

const addSector = async(sectorid,sectorName,locationId) => {

    let sql = 
    `insert into sector (idsector,sector_name,loc_id) values (null,'${sectorName}',${locationId})`;

    try {		  
        const data = await db.query(sql);
        return data;
    } catch (err) {   
        logger.error('addSector:error', err);
        throw ({ errno: err.errno, code: err.code });
    }
}

const addSubsector = async(subsectorid,subsectorName,sectorId) => {

    let sql = 
    `insert into subsector (idsubsector,subsector_name,sector_id) values (null,'${subsectorName}',${sectorId})`;

    try {		  
        const data = await db.query(sql);
        return data;
    } catch (err) {   
        logger.error('addSubsector:error', err);
        throw ({ errno: err.errno, code: err.code });
    }
}

const getOperationDataById = async (operationId) => {
    let sql = 
    `select * from operacion_data where idoperacion = ${operationId}`
    try {		  
        const data = await db.query(sql);
        return data;
    } catch (err) {   
        logger.error('getOperationDataById:error', err);
        throw ({ errno: err.errno, code: err.code });
    }
}

module.exports = {
    getAll,
    getOperationById,
    addLocation,
    addSector,
    addSubsector,
    getOperationDataById
}