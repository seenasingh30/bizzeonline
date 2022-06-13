const sendBadRequest = (res, msg = "Bad Request") => {
    return res.send({
        code : 400,
        msg : msg
    })
}

const sendSuccess = (res, msg = "Success",data, meta = {}) => {
    return res.send({
        code : 200,
        msg : msg,
        data : data,
        meta : meta
    })
}

const sendSystemError = (res,err, msg = "System error.") => {
    //console.log(err);
    return res.send({
        code : 500,
        msg : msg,
        err : err
    })
}

const sendError = (res, msg = "Error!") => {
    return res.send({
        code : 400,
        msg : msg
    })
}


module.exports = {
    sendBadRequest,
    sendSuccess,
    sendSystemError,
    sendError
}