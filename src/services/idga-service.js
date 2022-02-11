//const config = require("config")
const db = require("../utils/database")
const logger = require('../utils/logger');

const getAll = async () => {
    let sql = 
    `
    select 
        l.id_location,
        l.name as location_name,
        s.id_sector,
        s.name as sector_name,
        ss.id_subsector,
        ss.name as subsector_name
    from location l
    left join sector s on l.id_location = s.id_location
    left join subsector ss on s.id_sector = ss.id_sector
    `;

    try {		  
        const data = await db.query(sql);
        return data;
    } catch (err) {   
        logger.error('getAll:error', err);
        console.log(err)
        throw ({ errno: err.errno, code: err.code });
    }

}

const getLocations = async() => {
    let sql = 
    `
    select * from location
    `;

    try {		  
        const data = await db.query(sql);
        return data;
    } catch (err) {   
        logger.error('getOperationById:error', err);
        throw ({ errno: err.errno, code: err.code });
    }

}

const getOperationById = async(subsecid) => {
    let sql = 
    `
    select * from operation
    where id_subsector = ${subsecid}
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
    `insert into location (id_location,name) values (null,'${locationName}')`;

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
    `insert into sector (id_sector,name,id_location) values (null,'${sectorName}',${locationId})`;

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
    `insert into subsector (id_subsector,name,id_sector) values (null,'${subsectorName}',${sectorId})`;

    try {		  
        const data = await db.query(sql);
        return data;
    } catch (err) {   
        logger.error('addSubsector:error', err);
        throw ({ errno: err.errno, code: err.code });
    }
}

const getInspectionById = async (operationId) => {
    let sql = 
    `select * from inspection where id_operation = ${operationId}`
    try {		  
        const data = await db.query(sql);
        return data;
    } catch (err) {   
        logger.error('getOperationDataById:error', err);
        throw ({ errno: err.errno, code: err.code });
    }
}

const saveInspection = async (inspections) => {
    let sql = `insert into inspection (uuid(),id_operation,op_img_path,op_score,op_date,id_user) values`
    let values = ``
    for(let index in inspections){
        const operation = inspections[index];

        let check_if_exist = `select * from inspection where id_operation ='${operation.Id}' and op_date ='${operation.Date}'`
        let data = await db.query(check_if_exist)
        if(data.length === 0){
            values += `(${operation.Id},'${operation.ImgPath}','${operation.Score}','${operation.Date}',null)${inspections.length-1 == index ? ';' : ','}`
        }
    }    

    if(values){
        try {		  
            const data = await db.query(sql+values);
            return data;
        } catch (err) {   
            logger.error('Insert inspection: error', err);
            throw ({ errno: err.errno, code: err.code });
        }
    }
}

const getTodayInspections = async (subSecId,date) => {
    let sql = 
    `select * from operation o 
    inner join inspection i on i.id_operation = o.id_operation
    where o.id_subsector = '${subSecId}' and i.op_date ='${date}'`
    try {		  
        const data = await db.query(sql);
        return data;
    } catch (err) {   
        logger.error('getTodayInspections:error', err);
        throw ({ errno: err.errno, code: err.code });
    }
}

module.exports = {
    getAll,
    getOperationById,
    addLocation,
    addSector,
    addSubsector,
    getInspectionById,
    saveInspection,
    getTodayInspections,
    getLocations
}