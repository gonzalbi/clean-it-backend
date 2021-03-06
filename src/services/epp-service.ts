import * as db  from "../utils/database"

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
    left join sector_operator so on s.id_sector = so.id_sector
    left join operator o on o.id_operator = so.id_operator
    where s.id_location = ${locationId}
    `;

    try {		  
        const data = await db.query(sql);
        return data;
    } catch (err) {   
        console.log(err)
        throw ({func: 'getEPPInfo', errno: err.errno, code: err.code });
    }

}

const getOperatorsBySector = async (sectorId) => {
    let sql = 
    `
    select 
        id_operator
    from sector_operator
    where id_sector = ${sectorId}
    `;

    try {		  
        const data = await db.query(sql);
        return data;
    } catch (err) {   
        console.log(err)
        throw ({func: 'getOperatorsBySector', errno: err.errno, code: err.code });
    }
}

export {getEPPInfo,getOperatorsBySector}
