"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */

const Token = require('../models/token')
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    // tokrn verisi headers tan authorization başlığı altında geliyordu;
    const auth = req.headers?.authorization // Token ...tokenKey...
    const tokenKey = auth ? auth.split(' ') : null // ['Token', '...tokenKey...']

    if (tokenKey) {

        if (tokenKey[0] == 'Token') {
        //simpleToken

            const tokenData = await Token.findOne({ token: tokenKey[1] }).populate('userId')
            req.user = tokenData ? tokenData.userId : false
            // Token doğruysa sistemin her tarafında her sayafaya, user datasını gönderiyoruz
            // tokenData.userId içinde, yukarıda populate yapıldığı için user bilgileri olacak
            // çünkü tokenData modeldeki userId fieldı User modele REFerans ediliyor
            // eğer populate yapmadan tokenData ? tokenData.userId deseydik bu sefer sadece ID gelirdi

        } else if (tokenKey[0] == 'Bearer') {
        //JWT access token

            //jwt.verify(accessToken, access_key, callbackFunction)
            jwt.verify(tokenKey[1], process.env.ACCESS_KEY, function(error, accessData) {
                // if(accessData){
                //     console.log('JWT Verify: OK.')
                //     req.user = accessData
                // }else{
                //     console.log('JWT Verify: NO.')
                //     req.user = false
                // }

                //yukarıdakinin kısa yolu, simple tokendaki yapıya benzer olsun diye bu şekilde yaptı
                req.user = accessData ? accessData : false
            })
        }
    }
    next()
}