const {default: mongoose} = require("mongoose");

const clientSchema=mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        unique: true
    },
    phonenumber:{
        type:String,
        required:true,
        unique: true
    },
    address:{
        type:String,
        default: []
    },
    orders:{
        type:Array,
        default: []
    }
})

const Client=mongoose.model("client",clientSchema)
exports.module=Client

// const clientModel=mongoose.model("client",clientSchema);
// module.exports=clientModel;