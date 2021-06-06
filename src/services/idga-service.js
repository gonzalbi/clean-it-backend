//const config = require("config")
const db = require("../utils/database")
const logger = require('../utils/logger');

const getAll = async () => {
    let sql = 
    `
    select locacion_name,sector_name,subsector_name from locacion
    inner join sector on locacion.idlocacion = sector.loc_id
    inner join subsector on sector.idsector = subsector.sector_id
    `;

    try {		  
        const data = await db.query(sql);
        return data;
    } catch (err) {   
        logger.error('getAll:error', err);
        throw ({ errno: err.errno, code: err.code });
    }

}

const getOperationById = async(idop) => {
    let sql = 
    `
    select * from operacion
    
    `;

    try {		  
        const data = await db.query(sql);
        return data;
    } catch (err) {   
        logger.error('getOperationById:error', err);
        throw ({ errno: err.errno, code: err.code });
    }

}

module.exports = {
    getAll
}