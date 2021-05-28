const service = require('../../services/idga-service');

const locationData = [
    {
        locationName : 'Empresa 1',
        sections : [
            {
                sectionName : 'E1 - Seccion 1',
                subsections : [
                    {
                        subsectionName : 'E1 - S1 - Subseccion 1'
                    },
                    {
                        subsectionName : 'E1 - S1 - Subseccion 2'
                    },
                    {
                        subsectionName : 'E1 - S1 - Subseccion 3'
                    },
                ]
            },
            {
                sectionName : 'E1 - Seccion 2',
                subsections : [
                    {
                        subsectionName : 'E1 - S2 - Subseccion 1'
                    },
                    {
                        subsectionName : 'E1 - S2 - Subseccion 2'
                    },
                    {
                        subsectionName : 'E1 - S2 - Subseccion 3'
                    },
                ]
            }
        ]
    },
    {
        locationName : 'Empresa 2',
        sections : [
            {
                sectionName : 'E2 - Seccion 1',
                subsections : [
                    {
                        subsectionName : 'E2 - S1 - Subseccion 1'
                    },
                    {
                        subsectionName : 'E2 - S1 - Subseccion 2'
                    },
                    {
                        subsectionName : 'E2 - S1 - Subseccion 3'
                    },
                ]
            },
            {
                sectionName : 'E2 - Seccion 2',
                subsections : [
                    {
                        subsectionName : 'E2 - S2 - Subseccion 1'
                    },
                    {
                        subsectionName : 'E2 - S2 - Subseccion 2'
                    },
                    {
                        subsectionName : 'E2 - S2 - Subseccion 3'
                    },
                ]
            }
        ]
    },
]


const getLocationData = async (req, res, next) => {
    try{
        var data = await service.getAll()
        res.send(mapData(data))
    }catch(err){
        console.log(err)
    }
};

module.exports = {
    getLocationData
}

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