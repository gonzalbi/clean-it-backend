
import * as eppService from '../services/epp-service'
import {Operator} from '../models/Operator'
import {Sector} from '../models/Sector'


const getOperatorsBySector = async (locationId) => {
    const data = await eppService.getEPPInfo(locationId)

    const retData: Sector[] = [];
    for (let item of data) {
        const sector  = retData.find(sector => sector.id_sector == item.id_sector)
        if (sector) {
            const newOperator = item.id_operator ? new Operator(item.id_operator,item.operator_name, item.last_name, item.full_name) : null
            sector.Operators.push(newOperator)
            continue
        }

        const newOperator = item.id_operator ? new Operator(item.id_operator,item.operator_name, item.last_name, item.full_name) : null
        const newSector = new Sector(item.id_sector, item.sector_name, null, newOperator ? [newOperator] : null)
        retData.push(newSector)
    }

    return retData
}


const getEppFile = (sectorId) => {

    const file_path = `${__dirname}/../assets/files/${sectorId}_EPP.zip`

    return file_path
}

const getEntregaRopaFile = (sectorId) => {

    const file_path = `${__dirname}/../assets/files/${sectorId}_EntregaRopa.zip`

    return file_path
}



export {
    getOperatorsBySector,
    getEppFile,
    getEntregaRopaFile
}