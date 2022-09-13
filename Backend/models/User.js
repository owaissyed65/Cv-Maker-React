const mongoose = require('mongoose')
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const jsonwebtoken = 'helloiamowaishowareyou'
const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,

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
    Date: {
        type: Date,
        default: Date.now
    },
    tokens: [
        {
            token: {
                type: String,
                require: true
            }
        }
    ],
    messages: [
        {
            name: {
                type: String,
                require: true
            },
            email: {
                type: String,
                require: true,
                unique: true
            },
            phone: {
                type: Number,
                require: true
            },
            message: {
                type: String,
                require: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
})
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12)
        this.cpassword = await bcrypt.hash(this.password, 12)
    }
    next()
})
userSchema.methods.generateAuthToken = async function () {
    try {
        let token = await jwt.sign({ _id: this._id }, jsonwebtoken);
        this.tokens = this.tokens.concat({ token: token })
        await this.save();
        // console.log(token)
        return token
    } catch (error) {
        console.log(error)
    }
}
userSchema.methods.sendMessage = async function (name, email, phone, message) {
    try {
        this.messages = this.messages.concat({ name, email, phone: phone, message: message })
        await this.save()
        return this.messages;
    } catch (error) {
        console.log(error)
    }
}
const User = mongoose.model('Users', userSchema)
module.exports = User