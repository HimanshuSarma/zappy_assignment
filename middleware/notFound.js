const notFoundError = async (req, res, err, config) => {
    

    let errorCode = config && config.errorCode || 404;
    let message = config && config.message || `Not found${err ? `: ${err}` : ``}`;

    return res.status(errorCode).send({success: false, message});
}

module.exports = {
    notFoundError
}