const express = require('express')
const supplierService = require('../services/supplier.service')

const router = express.Router()
const service = new supplierService()

router.get('/',
  async (req,res,next)=>{
  try{
      let item = await service.find()
      res.statusCode = 200
      res.json(item)
  }catch(err){
     next(err)
  }
})

router.get('/:id',
  async (req,res,next) => {
    try {
      const { id } = req.params
      const item = await service.findOne(id)
      res.statusCode = 200
      res.json(item)
    }catch(err){
       next(err)
    }
  }
)
router.get('/search-email/:email',
  async (req,res,next) => {
    try {
      const { email } = req.params
      const item = await service.findByEmail(email)
      res.statusCode = 200
      res.json(item)
    }catch(err){
      next(err)
   }
  }
)

router.post('/',
  async (req,res,next)=>{
    try {
      const body = req.body
      const item = await service.create(body)
      res.statusCode = 200
      res.json(item)
    }catch(err){
      next(err)
   }
  }
)

router.patch('/:id',
  async (req,res,next)=>{
  try {
    const {id} = req.params
    const body = req.body
    const item = await service.update(body,id)
    res.statusCode = 200
    res.json(item)
  }catch(err){
    next(err)
  }
})

router.delete('/:id',
  async (req,res,next)=>{
    try {
      const {id} = req.params
      const item = await service.delete(id)
      res.statusCode = 200
      res.json(item)
    } catch (err){
      next(err)
    }
  })

module.exports = router
