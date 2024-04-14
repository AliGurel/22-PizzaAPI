"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
/*
    $ cp .env-sample .env
    $ npm init -y
    $ npm i express dotenv mongoose express-async-errors
    $ npm i morgan swagger-autogen swagger-ui-express redoc-express
    $ mkdir logs
    $ npm i jsonwebtoken
    $ npm i nodemailer multer
    $ nodemon
*/
const express = require('express')
const app = express()


/* ------------------------------------------------------- */
// Required Modules:

// envVariables to process.env:
require('dotenv').config()
const PORT = process.env?.PORT || 8000

// asyncErrors to errorHandler:
require('express-async-errors')

/* ------------------------------------------------------- */
// Configrations:

// Connect to DB:
const { dbConnection } = require('./src/configs/dbConnection')
dbConnection()

/* ------------------------------------------------------- */
// Middlewares:

// Accept JSON:
app.use(express.json())

// Accept Form-Data
app.use(express.urlencoded({extended:true}))

// Logger:
app.use(require('./src/middlewares/logger'))

// Auhentication:
app.use(require('./src/middlewares/authentication'))

// findSearchSortPage / res.getModelList:
app.use(require('./src/middlewares/queryHandler'))

/* ------------------------------------------------------- */
//* EMAIL
// nodemailer modülü kullanılacak
// https://www.nodemailer.com/
// https://www.npmjs.com/package/nodemailer
// https://ethereal.email/ // fake mail servisi


// const nodemailer = require('nodemailer')
// GMAIL, YANDEX gibi hazır servis kullanmıcaksak bu tarz bir mail server kullanabiliriz
// Create Test (Fake) Account:
// nodemailer.createTestAccount().then((data) => console.log(data))
/*
{e
  user: 'ntqxavoiba6ulmhd@ethereal.email',
  pass: 'wfNZNWMcmPeJhw73qG',
  smtp: { host: 'smtp.ethereal.email', port: 587, scure: false }, //mail gönderme
  imap: { host: 'imap.ethereal.email', port: 993, secure: true }, //mail alma
  pop3: { host: 'pop3.ethereal.email', port: 995, secure: true }, // mail alma, imap in glişmş hali
  web: 'https://ethereal.email'
}
*/
//yukarıdaki bilgiler fake mail bilgileridir
//fake mail oluştuktan sonra odemailer.createTestAccount().then((data) => console.log(data)) kodunu yoruma aldık

//Connect to mail server
// const transporter = nodemailer.createTransport({ //transporter mail gönderen objemiz
//     //mail göndermek için önce mail server ına bağlanmalıyız
//     // SMTP
//     host: 'smtp.ethereal.email', //mail göndereceğim server adresi, yukarıdaki fake mail bilgilerinden aldık
//     port: 587,
//     scure: false, //alternatifi SSL veya TLS olabilir
//     auth: {
//         user: 'ntqxavoiba6ulmhd@ethereal.email',
//         pass: 'wfNZNWMcmPeJhw73qG'
//     }
// })
// console.log(transporter);

// SEND MAIL
// transporter.sendMail({
//     from: 'ntqxavoiba6ulmhd@ethereal.email', // from yazılmak zorunda değil
//     to: 'aliigurel@gmail.com, info.ephesuss@gmail.com', // birden fazla adres yazabiliriz
//     subject: 'Hello',
//     text: 'Hello There. How are you?',
//     html: '<b> Hello There.</b> <p>How are you</p>'
// }, (error, success)=>{
//     success ? console.log('SUCCESS', success) : console.log('ERROR',error);
// })

//* Google Mail yani GMAIL servisi
//* Google -> AccountHome -> Security -> Two-Step-Verify -> App-Passwords
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'aliigurel@gmail.com',
//         pass: 'fduo krkf tgok amdr' //gerçek mail pass imiz değil, gmailden aldık bu şifreyi
//     }
// })

// transporter.sendMail({
//     // from: 'aliigurel@gmail.com', //yazılmayabilir
//     to: 'info.ephesuss@gmail.com, aliigurel@gmail.com',
//     subject: 'Hello',
//     text: 'Hello There. How are you?', // ikisi birden kullanılabbilir
//     html: '<b> Hello There.</b> <p>How are you</p>'
// }, (error, success)=>console.log(success, error))


// //? YandexMail (yandex):
// const transporter = nodemailer.createTransport({
//     service: 'Yandex',
//     auth: {
//         user: 'username@yandex.com',
//         pass: 'password' // your emailPassword, mail adrsinin passi, google gibi değil
//     }
// })

/* ------------------------------------------------------- */
// Routes:

// routes/index.js:
app.use('/', require('./src/routes/'))

// HomePath:
app.all('/', (req, res) => {
    res.send({
        error: false,
        message: 'Welcome to PIZZA API',
        docs: {
            swagger: "/documents/swagger",
            redoc: "/documents/redoc",
            json: "/documents/json",
        },
        user: req.user,
    })
})
// '/uploads' ile başlayan bir istek urlde gelirse bu dosya seni ilgilendirmez bu bir static dosyadır, bu dosyaları '/uploads' klasöründe bulabilirsin demek
//app.use .. ile başlayan tüm url ler demek miş?
app.use('/uploads', express.static('/uploads') )

/* ------------------------------------------------------- */

// errorHandler:
app.use(require('./src/middlewares/errorHandler'))

// RUN SERVER:
app.listen(PORT, () => console.log('http://127.0.0.1:' + PORT))

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')() // !!! It clear database.