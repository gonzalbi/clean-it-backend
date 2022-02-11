
const eppHandler = require('../../handler/epp-handler')

const getEPPInfo = async (req, res, next) => {
    try {
        const locationId = req.params.locationId

        const response = await eppHandler.getEppInfo(locationId)
        console.log(response)
        res.status(200).send(response)
    } catch (err) {
        console.log(err)
    }
};

module.exports = {
    getEPPInfo
}