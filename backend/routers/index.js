const registerRouter = require("./registerRouter")
const loginRouter = require("./loginRouter")
const verifyRouter = require("./verifyRouter")
const forgotPasswordRouter = require("./forgotPasswordRouter")
const resetPasswordRouter = require("./resetPasswordRouter")
const newPostRouter = require("./newPostRouter")
const getPosrRouter = require("./getPostRouter")
const likeRouter = require("./likeRouter")
const userProfileRouter = require("./userProfileRouter")
const getUserPostRouter = require("./getUserPostRouter")

module.exports = {
    registerRouter,
    loginRouter,
    verifyRouter,
    forgotPasswordRouter,
    resetPasswordRouter,
    newPostRouter,
    getPosrRouter,
    likeRouter,
    userProfileRouter,
    getUserPostRouter,
}