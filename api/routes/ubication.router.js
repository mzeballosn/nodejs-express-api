const express = require('express')
const ubicationService = require('../services/ubication.service')

const router = express.Router()
const service = new ubicationService()

router.get('/',
  async (req, res)=>{
    try {
      const item = await service.find()
      res.statusCode = 200
      res.json(item)
    } catch (error) {
      throw new Error(error.message)
    }
  }
)

module.exports = router
