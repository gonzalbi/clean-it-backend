//const config = require("config")
const db = require("../utils/database")
const logger = require('../utils/logger');

const getEPPInfo = async (locationId) => {
    let sql = 
    `
    select 
        s.id_sector,
        s.name sector_name,
        o.id_operator,
        o.name operator_name,
        o.last_name,
        o.full_name
    from sector s
    inner join sector_operator so on s.id_sector = so.id_sector
    inner join operator o on o.id_operator = so.id_operator
    where s.id_location = ${locationId}
    `;

    try {		  
        const data = await db.query(sql);
        return data;
    } catch (err) {   
        logger.error('getEPPInfo:error', err);
        console.log(err)
        throw ({ errno: err.errno, code: err.code });
    }

}

module.exports = {
    getEPPInfo
}