const mongoose = require('mongoose')
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    cpassword: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true,
    },
    work: {
        type: String,
        require: true
    },
})
userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12)
        this.cpassword = await bcrypt.hash(this.password,12)
    }
    next()
})
const User = mongoose.model('Users',userSchema)
module.exports=User