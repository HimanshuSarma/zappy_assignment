const createError = require('http-errors');
const db = require('../Models/index')
const Logs = db.logs;

const { genericError } = require('../middleware/genericError')
const { notFoundError } = require('../middleware/notFound')

module.exports = {
  getAllLogs: async (req, res, next) => {

    try {
      Logs.findAll()
      .then(result => {
        if (result) {
          res.status(200).send({success: true, data: result, message: `Logs fetched successfully.`});
        }
      })
      .catch(err => {
        genericError(req, res, err);
      })
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewLog: async (data, cb) => {
    try {
      Logs.create(data)
      .then(result => {
        if (result && result.id) {
          cb(true);
        }
      })
      .catch(err => {
        cb(false);
      })
    } catch (error) {
      cb(false);
    }
  },

  findLogById: async (req, res, next) => {
    const id = req.params.id;
    try {
      Logs.findOne({
        where: {id: parseInt(id)}
      })
      .then(result => {
        if (result & result.id) {
          res.status(200).send({success: true, data: result, message: `Log fetched successfully.`});
        } else {
          notFoundError(req, res, null);
        }
      })
      .catch(err => {
        genericError(req, res, err);
      })
    } catch (error) {
      console.log(error.message);
      genericError(req, res, error);
    }
  },

  updateAProduct: async (req, res, next) => {
    try {
      const id = req.params.id;

      Products.update(req.body, {
        where: {id: parseInt(id)}
      })
      .then(result => {
        if (result) {
          res.status(200).send({success: false, message: `Product updated successfully.`});
        } else {
          notFoundError(req, res, null);
        }
      })
      .catch(err => {
        genericError(req, res, err);
      })
      
    } catch (error) {
      console.log(error.message);
      console.log(error.message);
      genericError(req, res, error);
    }
  },

  deleteAProduct: async (req, res, next) => {
    const id = req.params.id;
    try {
      Products.destroy({
        where: {id}
      })
      .then(result => {
        if (result === 1) {
          res.status(200).send({success: true, message: `Product deleted successfully.`});
        } else {
          notFoundError(req, res, null);
        }
      })
      .catch(err => {
        genericError(req, res, err);
      })
    } catch (error) {
      console.log(error.message);
      console.log(error.message);
      genericError(req, res, error);
    }
  }
};
