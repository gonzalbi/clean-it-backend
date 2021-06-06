const Location = require("../../models/Location");
const Sector = require("../../models/Sector");
const SubSector = require("../../models/SubSector");

const service = require('../../services/idga-service');

const getLocationData = async (req, res, next) => {
    try{
        var data = await service.getAll()
        res.send(mapData(data))
    }catch(err){
        console.log(err)
    }
};

const getOperations = async(req, res, next) => {
    const opid = req.params.code;
    try{
        var data = await service.getOperationById(opid)
        res.send(data)
    }catch(err){
        console.log(err)
    }
};

const mapData = (data) => {
    let retData = [];
    for(let item of data){

        if(location = retData.find( x => x.getName() == item.locacion_name)){
            if(sector = location.getSectors().find(x => x.getName() == item.sector_name)){
                sector.addSubSector( new SubSector(item.subsector_name))
                continue
            }

            location.Sectors.push(new Sector(item.sector_name, new SubSector(item.subsector_name)))            
            continue
        }


        retData.push(
            new Location(item.locacion_name,
                new Sector(item.sector_name,
                    new SubSector(item.subsector_name,null)
                )
            )
        )

    }
    return retData
}


module.exports = {
    getLocationData,
    getOperations
}