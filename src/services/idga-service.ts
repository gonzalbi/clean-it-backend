import { Inspection } from "../models/Inspection";
import * as db  from "../utils/database"

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
        console.log(err)
        throw ({func: 'getAll', errno: err.errno, code: err.code });
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
        console.log(err)
        throw ({func: 'getLocations', errno: err.errno, code: err.code });
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
        console.log(err)
        throw ({func: 'getOperationById', errno: err.errno, code: err.code });
    }

}

const addLocation = async(locationName) => {

    let sql = 
    `insert into location (id_location,name) values (null,'${locationName}')`;

    try {		  
        const data = await db.query(sql);
        return data;
    } catch (err) {   
        console.log(err)
        throw ({func: 'addLocation', errno: err.errno, code: err.code });
    }
}

const addSector = async(sectorName,locationId) => {

    let sql = 
    `insert into sector (id_sector,name,id_location) values (null,'${sectorName}',${locationId})`;

    try {		  
        const data = await db.query(sql);
        return data;
    } catch (err) {   
        console.log(err)
        throw ({func: 'addSector', errno: err.errno, code: err.code });
    }
}

const addSubsector = async(subsectorName,sectorId) => {

    let sql = 
    `insert into subsector (id_subsector,name,id_sector) values (null,'${subsectorName}',${sectorId})`;

    try {		  
        const data = await db.query(sql);
        return data;
    } catch (err) {   
        console.log(err)
        throw ({func: 'addSubsector', errno: err.errno, code: err.code });
    }
}

const getInspectionById = async (operationId) => {
    let sql = 
    `select * from inspection where id_operation = ${operationId}`
    try {		  
        const data = await db.query(sql);
        return data;
    } catch (err) {   
        console.log(err)
        throw ({func: 'getInspectionById', errno: err.errno, code: err.code });
    }
}

const saveInspection = async (inspections: Inspection[]) => {

    let sql = `insert into inspection (id_inspection,id_operation,img_path,score,date,id_user) values`
    let values = ``
    for(let index in inspections){
        const inspection = inspections[index];

        try{
            const checkIfExistQuery = `select * from inspection where id_operation ='${inspection.id_operation}' and date ='${inspection.date}'`
            const previouslyCreatedInspection = await db.query(checkIfExistQuery)
            if(previouslyCreatedInspection.length === 0){
                values += `(uuid(),${inspection.id_operation},'${inspection.img_path}','${inspection.score}','${inspection.date}',null)${inspections.length-1 == parseInt(index) ? ';' : ','}`
            }
        }catch (err){
            console.log(err)
            throw ({func: 'saveInspection', errno: err.errno, code: err.code });
        }
    }    

    if(values){
        try {		  
            const data = await db.query(sql+values);
            return data;
        } catch (err) {   
            console.log(err)
            throw ({func: 'saveInspection', errno: err.errno, code: err.code });
        }
    }
}

const getTodayInspection = async (subSecId: string,date: string) => {
    let sql =  
    `select * from operation o 
    inner join inspection i on i.id_operation = o.id_operation
    where o.id_subsector = '${subSecId}' and i.date ='${date}'`
    try {		  
        const data = await db.query(sql);
        return data;
    } catch (err) {   
        console.log(err)
        throw ({func: 'getTodayInspection', errno: err.errno, code: err.code });
    }
}

export {
    getAll,
    getOperationById,
    addLocation,
    addSector,
    addSubsector,
    getInspectionById,
    saveInspection,
    getTodayInspection,
    getLocations
}