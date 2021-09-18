const mongoose = require('mongoose');

var guild = new mongoose.Schema({
    name:{unique:false,type:String,required:true},
    id:{unique:true,type:String,required:true},
    data: {
        notification_stream_channel:{unique:false,type:String,required:false},
        notification_content_channel:{unique:false,type:String,required:false},
        prefix_string:{unique:false,type:String,required:false},
    },
    disabled:{unique:false,type:Boolean,required:false}
})

module.exports = mongoose.model('Guild',guild)