const createError = require('http-errors');
const db = require('../Models/index')
const Products = db.products;

const { genericError } = require('../middleware/genericError')
const { notFoundError } = require('../middleware/notFound')

const { createNewLog } = require('../Controllers/Log.Controller')

module.exports = {
  getAllProducts: async (req, res, next) => {

    try {
      Products.findAll()
      .then(result => {
        if (result) {
          res.status(200).send({success: true, data: result, message: `Products fetched successfully.`});
          createNewLog({
            entity: 'products',
            description: `All product fetched`
          }, (response) => {
            if (response) {
              console.log(`Activity Logged`)
            } else {
              console.log(`Error occured in loggin activity.`)
            }
          })
        }
      })
      .catch(err => {
        genericError(req, res, err);
      })
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewProduct: async (req, res, next) => {
    try {
      Products.create(req.body)
      .then(result => {
        if (result && result.id) {
          res.status(200).send({success: true, data: result, message: `Products created successfully.`});
          createNewLog({
            entity: 'products',
            description: `Product created with id: ${result.id}`
          }, (response) => {
            if (response) {
              console.log(`Activity Logged`)
            } else {
              console.log(`Error occured in loggin activity.`)
            }
          })
        }
      })
      .catch(err => {
        genericError(req, res, err);
      })
    } catch (error) {
      console.log(error.message);
      if (error.name === 'ValidationError') {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },

  findProductById: async (req, res, next) => {
    const id = req.params.id;
    try {
      Products.findOne({
        where: {id: parseInt(id)}
      })
      .then(result => {
        if (result && result.id) {
          res.status(200).send({success: true, data: result, message: `Product fetched successfully.`});
          createNewLog({
            entity: 'products',
            description: `Product fetched with id: ${result.id}`
          }, (response) => {
            if (response) {
              console.log(`Activity Logged`)
            } else {
              console.log(`Error occured in loggin activity.`)
            }
          })
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
        if (result[0] === 1) {
          res.status(200).send({success: false, message: `Product updated successfully.`});
          createNewLog({
            entity: 'products',
            description: `PRODUCT UPDATED WITH ID: ${id}`
          }, (response) => {
            if (response) {
              console.log(`Activity Logged`)
            } else {
              console.log(`Error occured in loggin activity.`)
            }
          })
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
          createNewLog({
            entity: 'products',
            description: `Product deleted with id: ${id}`
          }, (response) => {
            if (response) {
              console.log(`Activity Logged`)
            } else {
              console.log(`Error occured in loggin activity.`)
            }
          })
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
