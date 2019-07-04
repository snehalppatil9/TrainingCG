var userService = require('../services/userServices');
var sendMail = require('../middleware/sendMail')
var util=require('../middleware/token')
exports.register = (req, res) => {
    try {
        //check validation of data
        req.checkBody('name', 'Name is not valid').isLength({ min: 3 }).isAlpha();
        req.checkBody('email', 'Email is not valid').isEmail();
        req.checkBody('password', 'Password is not valid').isLength({ min: 8 }).equals(req.body.cpassword);
        var errors = req.validationErrors();
        var responseResult = {};
        // any error occurs in validation it goes to if condition
        if (errors) {
            console.log("err in controller");
            responseResult.status = false;
            responseResult.message = errors;
            res.status(422).send(responseResult);
        }
        else {
            // console.log("else in controller");
            var responseResult = {};
            // here sending a request in services
            userService.register(req.body, (err, result) => {
                if (err) {
                    responseResult.success = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                }
                else {
                    responseResult.success = true;
                    responseResult.result = result;
                    responseResult.message = "Registration Successfull"
                    res.status(200).send(responseResult.message);
                }
            })
        }
    }
    catch (err) {
        console.log(err);

    }
}
module.exports.login = (req, res) => {
    console.log("req in controller", req.body);
    //check validation of data
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'password is not valid').isLength({ min: 4 });
   // var secret = "secretKey";
    var errors = req.validationErrors();
    var responseResult = {};
    if (errors) {
        responseResult.success = false;
        responseResult.error = errors;
        return res.status(422).send(responseResult);
    } else {
        userService.login(req.body, (err, data) => {
            if (err) {
                return res.status(500).send({
                    message: err
                });
            } else {
                const payload = {
                    email: req.body.email
                }
                var token = util.GenerateToken(payload);
                return res.status(200).send({
                    message: data,
                    "token": token
                });
            }
        })
    }

};
exports.getAllUsers = (req,res) => {
    userService.getAllUsers(req, (err, data) => {
        var responseResult = {};
        if (err) {
            return callback(err);
        } else {
            //console.log("datbase user data==>",data);
            responseResult.success = true;
            responseResult.result = data;
            res.status(200).send(responseResult);
        
        }
    })
}
exports.forgotPassword = (req, res) => {
    var responseResult = {};
    userService.forgotPassword(req.body, (err, result) => {
        if (err) {
            responseResult.success = false;
            responseResult.error = err;
            res.status(500).send(responseResult)
        }
        else {
            responseResult.success = true;
            responseResult.result = result;

            const payload = {
                user_id: responseResult.result._id
            }
            //console.log(payload);
            const obj = util.GenerateToken(payload);
            console.log("controller obj", obj);
            const url = `http://localhost:8080/#!/resetPassword/${obj.token}`;
            sendMail.sendMail(url);
            //Send email using this token generated
            res.status(200).send(url);
        }
    })
}
exports.resetPassword = (req, res) => {
    var responseResult = {};
    userService.resetPass(req, (err, result) => {
        if (err) {
            responseResult.success = false;
            responseResult.error = err;
            res.status(500).send(responseResult)
        }
        else {
            console.log('in user ctrl token is verified giving response');
            responseResult.success = true;
            responseResult.result = result;
            res.status(200).send(responseResult);
        }
    })
}
