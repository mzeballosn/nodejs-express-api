const {faker} = require('@faker-js/faker')
const boom = require('@hapi/boom')
const baseService = require('./base.service')


class supplierService extends baseService{
  constructor(){
    super('supplier',[])
    this.supplier=[]
    this.generate()
    super.setDataSetTemporal(this.supplier)
  }
  generate(){
    for(let index = 0; index < 100; index++){
      this.supplier.push({
         id:faker.string.uuid(),
         company: faker.company.name(),
         address:  faker.location.street('####'),
         email:faker.internet.email(),
         telephone: faker.phone.number(),
         nit:faker.string.numeric(12),
         isBlock: faker.datatype.boolean(),
       })
     }
  }

  async create(data){
    const item = this.elements.filter(element =>  element.company === data.company )

    if(item.length > 0){
      throw boom.conflict(`${this.basename} exists...`)
    }
    const newElement={
      id: faker.string.uuid(),
      ...data
    }
    this.elements.push(newElement)

    return newElement
  }

  async findByEmail(email){
    const item = this.elements.find(element => element.email === email)
    if(!item){
      throw boom.notFound(`${this.basename} not found`)
    }
    return item
  }
}

module.exports = supplierService
