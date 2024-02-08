const {faker} = require('@faker-js/faker')
const boom = require('@hapi/boom')

class baseService{
  constructor(basename){
    this.basename = basename
    this.elements = []
  }
  async setDataSetTemporal(data){
    this.elements = data

  }
  async find(){
    return this.elements
  }
  async findOne(id){
    const item = this.elements.find(element => element.id === id)
    if(!item){
      throw boom.notFound(` not found`)
    }
    return item
  }

  async create(data){
    const item = this.elements.filter(element =>  element.name === data.name )

    if(item.length > 0){
      throw boom.notFound(`${this.basename} exists data`)
    }
    const newElement={
      id: faker.string.uuid(),
      ...data
    }
    this.elements.push(newElement)

    return newElement
  }
  async update(changes,id){
    const index = this.elements.findIndex(element => element.id == id)
    if(index === -1){
      throw new boom.badImplementation('not found')
    }
    const updateProduct = {
      ...this.elements[index],
      ...changes
    }
    this.elements[index] = updateProduct

    return  updateProduct
  }

  async delete(id){
    const index = this.elements.findIndex(element => element.id == id)
    if(index == -1){
      throw  new boom.notFound(`${this.basename} not found`)
    }
    this.elements.splice(index,1)
    return { id }
  }
}

module.exports = baseService
