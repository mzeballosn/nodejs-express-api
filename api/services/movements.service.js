const {faker} = require('@faker-js/faker')
//const {bomm} = require('@hapi/boom')
const baseService = require('./base.service')

class movementsServices extends baseService{
  constructor(){
    super('movements',[])
    this.movements=[]
    this.generate()
    super.setDataSetTemporal(this.movements)
  }
  generate(){
    for(let index = 0; index < 100; index++){
      this.supplier.push({
         id:faker.string.uuid(),
         name: faker.string.name(),
         address:  faker.location.street('####'),
         email:faker.internet.email(),
         telephone: faker.phone.number(),
         nit:faker.string.numeric(12),
         isBlock: faker.datatype.boolean(),
       })
     }
  }
}

exports.module = movementsServices
