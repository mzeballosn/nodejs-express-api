const {faker} = require('@faker-js/faker')
const baseService = require('./base.service')

class ubicationService extends baseService{
  constructor(){
    super('ubication', [])
    this.ubication = []
    this.generate()
    super.setDataSetTemporal(this.ubication)

  }
  generate(){
    for(let index = 0; index < 100; index++){
      this.ubication.push({
         id:faker.string.uuid(),
         ubication: faker.string.alpha(),
         capacity: faker.string.alpha(6),
         isBlock: faker.datatype.boolean(),
       })
     }
  }
}

module.exports = ubicationService
