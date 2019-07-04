var mongoose = require('mongoose');
var mongoSchema = mongoose.Schema;
var chatSchema = new mongoSchema({
    senderUserId: {
        type:String,
        required:[true,"sender id is required"]
    },
    senderName: {
        type:String,
        required:[true,"sender name is required"]

    },
        
    receiverUserId: {
        
        type:String,
        required:[true,"sender id is required"]

    },
    receiverName: {
        type:String,
        required:[true,"sender id is required"]

    },
    message:{

        type:String,
        required:[true,"sender id is required"]

    }

}, {
        timestamps: true
    });

function chatModel() {

}
var chat = mongoose.model('chatInfo', chatSchema);
try {
    chatModel.prototype.addMessage = (chatData, callback) => {
        console.log('In chatmodel', chatData.senderUserId)

        const newMessage = new chat({
            senderUserId: chatData.senderUserId,
            senderName: chatData.senderName,
            receiverUserId: chatData.receiverUserId,
            receiverName: chatData.receiverName,
            message: chatData.message
        });
        console.log("new Msg in model==>",newMessage);
        
        newMessage.save((err, result) => {


            if (err) {
                console.log("ERROR: Data was not saved ",err);
                return callback(err);
            } else {
                console.log("Data was saved successfully");
                return callback(null,result);
            }
        });
    }

}
catch (err) {
    console.log("result not found")
}
try {
    chatModel.prototype.getUserMsg = (req ,callback) => {
        //console.log("==============>",req);
        
        chat.find({}, (err, data) => {
            if (err) {
                callback(err)
            } else {
                console.log("ERROR: DATA not found!",data)
                callback(null, data);
                
            }

        })
    }

}
catch (err) {
    console.log("ERROR: DATA not found!")
}

module.exports = new chatModel();