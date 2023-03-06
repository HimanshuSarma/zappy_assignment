const db = require('../Models/index');
const Users = db.users;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { genericError } = require('../middleware/genericError')
const { notFoundError } = require('../middleware/notFound')

const { createNewLog } = require('../Controllers/Log.Controller')

const userRegister = async (req, res) => {
    try {

        const newUser = {};

        if (req.body.username) newUser[`username`] = req.body.username;
        else {
            return genericError(req, res, null, {
                errorCode: 500,
                message: `Username is required`
            })
        }

        if (req.body.role) newUser[`role`] = req.body.role;
        else {
            return genericError(req, res, null, {
                errorCode: 500,
                message: `Role is required`
            })
        }

        if (req.body.password) {
            bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
                if (err) {
                    genericError(req, res, null);
                } else {
                    newUser[`password`] = hashedPassword;
                    Users.create(newUser)
                    .then(result => {
                        if (result && result.id) {
                            res.status(200).send({success: true, data: result, message: `User created successfully.`});
                            createNewLog({
                                entity: 'users',
                                description: `User registered with username ${result.username}`
                            }, (response) => {
                                console.log(47, response);
                            })
                        }
                    })
                    .catch(err => {
                        genericError(req, res, err);
                    })
                }
            })
        } else {
            return genericError(req, res, null, {
                errorCode: 500,
                message: `Username is required`
            })
        }
    } catch (err) {
        genericError(req, res, err);
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        Users.findOne({
            where: {
                username
            }
        })
        .then(result => {
            if (result && result.id) {
                bcrypt.compare(password, result.password, (err, bcryptResult) => {
                    if (err) {
                        genericError(req, res, err, {
                            errorCode: 500,
                            message: `Password is incorrect`
                        })
                    } else if (bcryptResult) {
                        const token = jwt.sign({
                            username: result.username,
                            role: result.role,
                            id: result.id
                        }, process.env.JWT_PRIVATE_KEY);

                        res.status(200).send({success: true, data: {
                            ...result.dataValues,
                            token
                        }, message: `Login successfull.`});

                        createNewLog({
                            entity: 'users',
                            description: `User logged in with username ${result.username}`
                        }, (response) => {
                            console.log(102, response);
                        })
                    } else {
                        genericError(req, res, null);
                    }
                })
            } else {
                notFoundError(req, res, null);
            }
        })
        .catch(err => {
            genericError(req, res, err);
        })
    } catch (err) {
        genericError(req, res, err);
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
    userRegister,
    login
}