var userModel = require('../models/userModel');
exports.register = (data, callback) => {
    userModel.register(data, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        }
        else {
            console.log("In service", result);
            callback(null, result);
        }
    })
}
exports.login = (req, callback) => {
    //console.log("login service",req);
    userModel.login(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}
exports.getAllUsers = (req, callback) => {
    userModel.getAllUsers(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}
exports.forgotPassword=(data,callback)=>{
    userModel.forgotPassword(data,(err,result)=>{
        if(err){
            callback(err);
        }else {
            callback(null,result)
        }
    })
}

exports.resetPass=(req,callback)=>{
    userModel.updateUserPassword(req,(err,result)=>{
        if(err){
            callback(err);
        }else {
            callback(null,result)
        }
    })
}

