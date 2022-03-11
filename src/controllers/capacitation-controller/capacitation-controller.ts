

const getCapacitationInfo = async (req , res) => {
    const locationId = req.params.locationId

    res.status(200).send(locationId)

}

export {getCapacitationInfo}