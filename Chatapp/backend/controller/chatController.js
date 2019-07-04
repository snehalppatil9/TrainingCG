const chatServices = require('../services/chatServices')
try {
    module.exports.message = (req, callback) => {
        console.log("request = ", req);
        chatServices.addMessage(req, (err, data) => {
            if (err) {
                console.log("ERROR: in controller");
                callback(err);
            } else {
                console.log("controller works");
                callback(null, data);
            }
        })
    }
}
catch (err) {
    console.log("ERROR: while sending the message");
}
try {
    module.exports.getUserMsg = (req, res) => {
        chatServices.getUserMsg(req, (err, data) => {
            var responseResult = {};
            if (err) {
                responseResult.success = false;
                responseResult.result = data;
                res.status(500).send(responseResult);

            } else {
                responseResult.success = true;
                responseResult.result = data;
                res.status(200).send(responseResult);
            }
        })
    }
}
catch (err) {
    console.log("ERROR : in chat controll");

}