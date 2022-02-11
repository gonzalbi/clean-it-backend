
const eppService = require('../services/epp-service')
const Operator = require('../models/Operator')
const Sector = require('../models/Sector')


const getEppInfo = async (locationId) => {
    const data = await eppService.getEPPInfo(locationId)

    const retData = [];
    for (let item of data) {

        if (sector = retData.find(sector => sector.getId() == item.id_sector)) {
            const newOperator = item.id_operator ? new Operator(item.id_operator,item.operator_name, item.last_name, item.full_name) : null
            sector.addOperator(newOperator)
            continue
        }

        const newOperator = item.id_operator ? new Operator(item.id_operator,item.operator_name, item.last_name, item.full_name) : null
        const newSector = new Sector(item.id_sector, item.sector_name, null, newOperator)
        retData.push(newSector)
    }

    return retData
}


module.exports = {
    getEppInfo
}