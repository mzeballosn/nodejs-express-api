const express = require('express')
const { faker } = require('@faker-js/faker')

const router = express.Router()

const users = () => {
  const usr =  []
  let i = 0
  for(i; i < 50; i++){
    usr.push({
      userId: faker.string.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
    })
  }
  return usr
}
router.get('/',(req,res)=>{
    res.json(users())

1})

module.exports = router


