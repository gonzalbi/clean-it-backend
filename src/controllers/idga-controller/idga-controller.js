const service = require('../../services/idga-service');

const getLocationData = async (req, res, next) => {
    try{
        var data = await service.getAll()
        res.send(mapData(data))
    }catch(err){
        console.log(err)
    }
};

const mapData = (data) => {
    let retData = [];
    for(let item of data){
        var locationData = {}
        let sectorData = {}
        let subSectorData = []

        if(location = retData.find( x => x.locationName == item.locacion_name)){
            if(sector = location.sectors.find(x => x.sectorName == item.sector_name)){
                sector.subsections.push(item.subsector_name)
                
                continue
            }
            
            sectorData.sectorName = item.sector_name
            sectorData.subsections = []
            sectorData.subsections.push(item.subsector_name)

            location.sectors.push(sectorData)            
            continue
        }

        locationData.locationName = item.locacion_name
        sectorData.sectorName = item.sector_name
        sectorData.subsections = []
        sectorData.subsections.push(item.subsector_name)
        
        locationData.sectors = []
        locationData.sectors.push(sectorData)

        retData.push(locationData)

    }
    return retData
}


module.exports = {
    getLocationData
}