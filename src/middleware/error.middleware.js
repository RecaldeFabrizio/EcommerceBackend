const { EError } = require("../utils/CustomError/EErorrs");

exports.errorHandler = (error, req, res ,next) =>{
    console.log(error.cause)
    switch (error.code) {
        case EError.INVALID_TYPE_ERROR:
            return res.send({status:'error', error: error.name})
            break;
    
        default:
            return res.send({status: 'error', error:'Unhandler error'})
            break;
    }
}