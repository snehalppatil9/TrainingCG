// userModel.js
const bcrypt = require('bcrypt');
var saltRounds = 10;
var mongoose = require('mongoose');
var mongoSchema = mongoose.Schema;
// Setup schema
var userSchema = mongoSchema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
    
});
var user = mongoose.model('user', userSchema);
function userModel() { }
function hash(password) {
    var hash = bcrypt.hashSync(password, saltRounds);
    return hash;
}

userModel.prototype.register = (body, callback) => {
    user.find({
        "email": body.email
    }, (err, data) => {
        if (err) {
            console.log("Error in Registration");
            callback("User Already Present")
        }
        else {
            
            const newUser = new user({
                "name": body.name,
                "email": body.email,
                "password": hash(body.password)
            });
            newUser.save((err, result) => {
                if (err) {
                    console.log("Model not found");
                    callback(err,result);
                } else {
                    console.log("Registered Successfully");
                    callback(null, result)
                }
            })
        }
    });
}
userModel.prototype.login = (body, callback) => {
    user.find({ "email": body.email }, (err, data) => {
        if (err) {
            return callback(err);
        } else if (data.length > 0) {
            bcrypt.compare(body.password, data[0].password, function (err, res) {
                if (err) {
                    return callback(err);
                } else if (res) {
                    console.log(data);

                    return callback(null, data);
                } else {
                    return callback("Incorrect password").status(500);
                }
            });
        } else {
            return callback("Invalid User ");
        }
    });
}
userModel.prototype.getAllUsers = (req,callback) => {
    user.find({}, (err, data)=>{
       if(err){
           callback("error is in model" + err)
       }else{
           callback(null , data);
       }
    })
} 
userModel.prototype.forgotPassword=(data,callback)=>{
    user.findOne({"email": data.email},(err,result)=>{
        if(err) {
            callback(err);
        }
        else {
            if(result!==null && data.email==result.email) {
                callback(null,result);
            }
            else {
                callback("inncorrect mail")
            }
        }
    })
}
userModel.prototype.updateUserPassword=(req,callback)=> {
    console.log('in model--data:--',req.decoded);
    console.log('in model--body:--',req.body);

    let newpassword=bcrypt.hashSync(req.body.password,saltRounds);
    console.log(('new pass bcrypt--',newpassword));
    user.updateOne({ _id:req.decoded.payload.user_id},{password:newpassword},(err,result)=>{
        if(err) {
            callback(err);
        }
        else {
            callback(null,result);
        }  
    })   
}
    
module.exports = new userModel();