
const eppHandler = require('../../handler/epp-handler')

const getEPPInfo = async (req, res, next) => {
    try {
        const locationId = req.params.locationId
        
        if(!locationId) res.status(400).send()

        const response = await eppHandler.getEppInfo(locationId)
        res.status(200).send(response)
    } catch (err) {
        console.log(err)
    }
};

module.exports = {
    getEPPInfo
}