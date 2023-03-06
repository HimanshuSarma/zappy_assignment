const jwt = require("jsonwebtoken");
const db = require('../Models/index')
const Users = db.users;
const { genericError } = require('../middleware/genericError')
const { notFoundError } = require('../middleware/notFound')

module.exports = async (req, res, next, role) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split('Bearer ')[1];
            const verification = await jwt.verify(token, process.env.JWT_PRIVATE_KEY);
            if (verification) {
                if (!role) next();
                else if (role) {
                    Users.findOne({
                        where: {id: verification.id}
                    })
                    .then(result => {
                        if (result && result.id) {
                            if (result.role === role) {
                                next();
                            } else {
                                res.status(500).send({success: false, message: `Your role has to be ${role} to perform this action`})
                            }
                        } else {
                            notFoundError(req, res, null);
                        }
                    })
                    .catch(err => {
                        genericError(req, res, err);
                    })
                } else {
                    return res.status(500).send({success: false, message: `Your role has to be ${role} to perform this action`})
                }
            } else {
                return res.status(500).send({success:false, message: `Token is not valid`})
            }
        } else {
            return res.status(500).send({success:false, message: `Auth token is required.`})
        }
    }
    catch (err) {
        return res.status(500).send({success:false, message: `Token is not valid`}) 
    }
}