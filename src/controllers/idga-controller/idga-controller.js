const Location = require("../../models/Location");
const Sector = require("../../models/Sector");
const SubSector = require("../../models/SubSector");
const Operation = require("../../models/Operation");

const service = require('../../services/idga-service');

const getLocationData = async (req, res, next) => {
    try{
        var data = await service.getAll()
        res.send(mapLocationData(data))
    }catch(err){
        console.log(err)
    }
};

const getOperations = async(req, res, next) => {
    const subsecid = req.params.opid;
    try{
        var data = await service.getOperationById(subsecid)
        let operations = []
        for(let operation of data){
            operations.push(new Operation(operation.idoperacion,operation.name))
        }

        res.send(operations)
    }catch(err){
        console.log(err)
    }
};

const saveOperationData = async(req, res, next) => {
    try{

    }catch{
        
    }
}


const mapLocationData = (data) => {
    let retData = [];
    for(let item of data){

        if(location = retData.find( x => x.getId() == item.idlocacion)){
            if(sector = location.getSectors().find(x => x.getId() == item.idsector)){
                sector.addSubSector( new SubSector(item.idsubsector,item.subsector_name))
                continue
            }

            location.Sectors.push(
                new Sector(item.idsector,item.sector_name, 
                    new SubSector(item.idsubsector,item.subsector_name)))            
            continue
        }


        retData.push(
            new Location(item.idlocacion,item.locacion_name,
                new Sector(item.idsector,item.sector_name,
                    new SubSector(item.idsubsector,item.subsector_name,null)
                )
            )
        )

    }
    return retData
}


module.exports = {
    getLocationData,
    getOperations,
    saveOperationData
}