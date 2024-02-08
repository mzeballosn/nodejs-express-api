const Joi = require('joi')

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(50)
const price = Joi.number().integer().min(10)
const image = Joi.string().uri()
const isBlock= Joi.boolean()

const createProductSchema  = Joi.object({
    name: name.required(),
    price: price.required(),
    image: image,
    isBlock: isBlock,
})

const updateProductSchema  = Joi.object({
  name: name,
  price: price,
})
const getProductSchema  = Joi.object({
   id: id.required()
})

module.exports = { createProductSchema, updateProductSchema, getProductSchema }
