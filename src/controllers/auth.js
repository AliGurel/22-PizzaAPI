"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Auth Controller:

const User = require('../models/user')
const Token = require('../models/token')
const passwordEncrypt = require('../helpers/passwordEncrypt')
const jwt = require('jsonwebtoken')

module.exports = {

    login: async (req, res) => {
        /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Login"
            #swagger.description = 'Login with username (or email) and password for get simpleToken and JWT'
            #swagger.parameters["body"] = {
                in: "body",
                required: true,
                schema: {
                    "username": "test",
                    "password": "aA?123456",
                }
            }
        */
        // Kullanıcı ister username-password ile ister email-password ile login olabilir
        const { username, email, password } = req.body

        if ((username || email) && password) {

            const user = await User.findOne({ $or: [{ username }, { email }] }) // böyle bi username veya email var mı

            if (user && user.password == passwordEncrypt(password)) {

                if (user.isActive) {

                    /* SIMPLE TOKEN */

                    let tokenData = await Token.findOne({ userId: user.id }) // id verisini user._id veya user.id olarak çağırabiliriz aynı şey

                    if (!tokenData) tokenData = await Token.create({
                        userId: user.id,
                        token: passwordEncrypt(user.id + Date.now())
                    })

                    /* SIMPLE TOKEN */
                    /* JWT  */
                    // 2 tür token iletilir
                    const accessInfo = { //kısa süreli olan token/data ancak kritik verilerere sahip
                        key: process.env.ACCESS_KEY,
                        time: process.env?.ACCESS_EXP || '30m',
                        data: {
                            _id: user._id,
                            id: user.id,
                            username: user.username,
                            email: user.email,
                            password: user.password,
                            isActive: user.isActive,
                            isAdmin: user.isAdmin
                        },

                    }

                    const refreshInfo = { // uzun ömürlü token (3 gün), kritik olmayan veriler
                        key: process.env.REFRESH_KEY,
                        time: process.env?.REFRESH_EXP || '3d',
                        data: {
                            id: user.id,
                            password: user.password // burdaki password de şifreli
                        }
                    }
                    // jwt.sign(accessdata, access_key, {ayarlar => expiresIn: '30m})
                    const accesToken = jwt.sign(accessInfo.data, accessInfo.key, { expiresIn: accessInfo.time })
                    const refreshToken = jwt.sign(refreshInfo.data, refreshInfo.key, { expiresIn: refreshInfo.time })
                    /* JWT */


                    res.status(200).send({
                        error: false,
                        token: tokenData.token,
                        bearer: {
                            access: accesToken,
                            refresh: refreshToken
                        },
                        user
                    })

                } else {

                    res.errorStatusCode = 401
                    throw new Error('This account is not active.')

                }
            } else {

                res.errorStatusCode = 401
                throw new Error('Wrong username/email or password.')
            }
        } else {

            res.errorStatusCode = 401
            throw new Error('Please enter username/email and password.')
        }

    },

    refresh: async (req, res) => {
        /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "JWT: Refresh"
            #swagger.description = 'Refresh token.'
        */

        const refreshToken = req.body?.bearer?.refresh

        if (refreshToken) {

            const refreshData = await jwt.verify(refreshToken, process.env.REFRESH_KEY)
            // console.log(refreshData)

            if (refreshData) {

                const user = await User.findOne({ _id: refreshData.id })

                if (user && user.password == refreshData.password) {

                    res.status(200).send({
                        error: false,
                        bearer: {
                            access: jwt.sign(user.toJSON(), process.env.ACCESS_KEY, { expiresIn: (process.env?.ACCESS_EXP || '3d') })
                        }
                    })

                } else {

                    res.errorStatusCode = 401
                    throw new Error('Wrong id or password.')
                }

            } else {
                res.errorStatusCode = 401
                throw new Error('JWT refresh data is wrong.')
            }

        } else {
            res.errorStatusCode = 401
            throw new Error('Please enter bearer.refresh')
        }

    },

    logout: async (req, res) => {
        /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "simpleToken: Logout"
            #swagger.description = 'Delete token key.'
        */

        const auth = req.headers?.authorization // Token ...tokenKey...
        const tokenKey = auth ? auth.split(' ') : null // ['Token', '...tokenKey...']


        if (tokenKey[0] == 'Token') {
            const result = await Token.deleteOne({ token: tokenKey[1] })

            res.send({
                error: false,
                message: 'Token deleted. Logout was OK.',
                result
            })
        } else {
            res.send({
                error: false,
                message: 'JWT: No need any process for logout.'
            })

        }
        //NOt: JWT de logout işlemi yok
    }

}