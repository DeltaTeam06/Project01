const { Router } = require('express')
const { signup, login, otpp, resend } = require('../controllers/authController')

const authRouter = Router()

authRouter.post('/signup', signup)
authRouter.post('/login', login)
authRouter.post('/authenticate', otpp)
authRouter.post('/resendotp', resend)


module.exports = authRouter