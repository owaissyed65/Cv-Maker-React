const jwt = require('jsonwebtoken')
const jsonwebtoken = 'helloiamowaishowareyou';
const User = require('../models/User')
const express = require('express')

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken
        const verifyUser = jwt.verify(token, jsonwebtoken)
        const findUser = await User.findOne({ _id: verifyUser._id, 'tokens.token': token })
        if (!findUser) { throw new Error('User Not Found') }
        req.token = token
        req.verifyUser = verifyUser
        req.findUser = findUser
        req.userID = findUser._id
        next();
    } catch (error) {
        res.status(401).json({ message: "No Authentication Provided" })

    }
}
module.exports = authenticate