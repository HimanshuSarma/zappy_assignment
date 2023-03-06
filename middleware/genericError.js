const genericError = async (req, res, err, config) => {
    

    let errorCode = config && config.errorCode || 500;
    let message = config && config.message || `Some error occured: ${err}`;

    return res.status(errorCode).send({success: false, message});
}

module.exports = {
    genericError
}