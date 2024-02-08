const express = require('express')
const cors = require('cors')
const routerApi = require('./routes')
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')


const app = express()
const port= 3050
app.use(express.json())


const whitelist = ['http://127.0.0.1:5500','http://localhost:5500', 'http://localhost:5500/favicon.ico'];
const options = {
  origin: (origin, callback) => {
   const sites = whitelist.includes(origin)

    if (sites){
      callback(null, true);
    } else {
      callback(null,false);
    }
  }
}
app.use(cors(options));



// rutas
routerApi(app)

//los middleware siempre se declaran despues de las rutas, las rutas también son middleware
//se debe tener en cuenta el orden de los middleware debido a que son secuenciales
app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port,()=>{
  console.log("Server run on "+ port) // eslint-disable-line
})
