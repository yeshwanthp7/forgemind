const mongoose = require("mongoose");

const machineSchema = new mongoose.Schema(
{
    machineId:{
        type:String,
        required:true,
        unique:true,
    },
    name:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    department:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["active","inactive","maintenance"],
        default:"inactive",
    },
    manufacturer:{
        type:String,
    },
    lastMaintained:{
        type:Date,
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("Machine", machineSchema);