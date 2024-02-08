const { faker} = require('@faker-js/faker')
const boom  = require('@hapi/boom')

class productsService{

  constructor(){
    this.products = []
    this.generate()
  }
  generate(){
    for(let index = 0; index < 100; index++){
     this.products.push({
        id:faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(),10),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean(),
      })
    }
  }
  async find(){
    return this.products
  }
  async findOne(id){
    const item = this.products.find(element => element.id === id)
    if(!item){
     throw boom.notFound('Product not found')
    }
    if(item.isBlock){
      throw boom.notFound('Product it blocked')
    }
    return item
  }
  async create(data){
    const item = this.products.filter(element =>  element.name === data.name )

    if(item.length > 0){
      throw boom.conflict('Product exist')
      //throw new Error('Product exist')
    }
    const newProduct={
      id: faker.string.uuid(),
      ...data
    }
    this.products.push(newProduct)

    return newProduct
  }
  async update(changes,id){
    const index = this.products.findIndex(element => element.id == id)
    if(index === -1){
      throw boom.notFound('Product not found')
    }
    const updateProduct = {
      ...this.products[index],
      ...changes
    }
    this.products[index] = updateProduct

    return  updateProduct
  }

  async delete(id){
    const index = this.products.findIndex(element => element.id == id)
    if(index == -1){
      throw boom.notFound('Product not found')
    }
    this.products.splice(index,1)
    return { id }
  }
}

module.exports = productsService
