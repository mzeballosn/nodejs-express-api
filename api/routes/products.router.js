const express = require('express')
const productsService = require('./../services/products.service')
const validatorHandler = require('../middlewares/validation.handler')
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas-dto/product.schema')

const router = new express.Router()
const service = new productsService()

router.get('/filter',(req, res)=>{
  res.send('fitro')
})

router.get('/',
  async (req,res, next)=>{
      try {
        const item = await service.find()
        res.statusCode = 200
        res.json(item)
      } catch (error) {
        next(error)
      }
})

router.get('/:id',
  validatorHandler(getProductSchema),
  async  (req,res)=>{
    try {
      const {id} = req.params
      const item = await service.findOne(id)
      res.statusCode = 200
      res.json(item)
    } catch (error) {
      res.status(404).json({
        message:error.message
      })
    }
  }
)

router.post('/',
  validatorHandler(createProductSchema,'body'),
  async (req, res, next)=>{
    try {
      const body = req.body
      const item = await service.create(body)

      res.json({
        message: 'created product',
        data: item
      })
    } catch (error) {
      next(error)
      /*
      res.json({
        message:error.message
      })*/
    }
  }
)

router.patch('/:id',
  validatorHandler(getProductSchema,'params'),
  validatorHandler(updateProductSchema,'body'),
  async (req, res, next)=>{
    try {
      const body = req.body
      const {id} = req.params
      let msg = 'product update'
      const item = await service.update(body,id)

      res.json({
        message:msg,
        data:item
      })
    } catch (error) {
      next(error)
    }
  }
)

router.delete('/:id',async  (req, res)=>{
  const { id } = req.params
  res.json(await service.delete(id))
})


module.exports = router
