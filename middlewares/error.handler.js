function logErrors(err, req, res, next ){
    //console.log(err)
    next(err)
}
function errorHandler(err, req, res, next) {
  res.status(500).json({
        message: err.message,
        stack:err.stack
  });
}
// Cannot  set Header after they are sent to the client
function boomErrorHandler(err, req, res, next){
  const {isBoom} = err
  if(isBoom){
    const { output } =  err
    console.log(output.payload.message)
    res.status(output.statusCode).json(output.payload)
  }else{
    next(err)
  }
}

module.exports = { logErrors, errorHandler, boomErrorHandler   }

