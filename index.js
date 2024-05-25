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

// Accept Form-Data, formlardan gelen verileri kabul et demek
app.use(express.urlencoded({extended:true}))

// Logger:
app.use(require('./src/middlewares/logger'))

// Auhentication:
app.use(require('./src/middlewares/authentication'))

// findSearchSortPage / res.getModelList:
app.use(require('./src/middlewares/queryHandler'))

/* ------------------------------------------------------- */
//* EMAIL 
// bunu birfonk halinde yazdık index.js te artık yeri yok
// nodemailer modülü kullanılacak
// https://www.nodemailer.com/
// https://www.npmjs.com/package/nodemailer
// https://ethereal.email/ // fake mail servisi

//*NORMAL bir MAIL server ile mail gönderme (gmail, yandex harici gibi)
// const nodemailer = require('nodemailer')
// GMAIL, YANDEX gibi hazır servis kullanmıcaksak bu tarz bir mail server kullanabiliriz
// Create Test (Fake) Account, fake bir mail hesabı oluşturuyoruz;
// nodemailer.createTestAccount().then((data) => console.log(data))
// fake mail hesabı bilgileri aşağıda, hesap bilgisini alınca yukardaki kodu yoruma al
/*
{
  user: 'ntqxavoiba6ulmhd@ethereal.email',
  pass: 'wfNZNWMcmPeJhw73qG',
  smtp: { host: 'smtp.ethereal.email', port: 587, scure: false }, //mail gönderme
  imap: { host: 'imap.ethereal.email', port: 993, secure: true }, //mail alma
  pop3: { host: 'pop3.ethereal.email', port: 995, secure: true }, // mail alma, imap in gelişmiş hali
  web: 'https://ethereal.email'
}
*/
//yukarıdaki bilgiler fake mail bilgileridir
//fake mail oluştuktan sonra odemailer.createTestAccount().then((data) => console.log(data)) kodunu yoruma aldık
//herhangi bir mail servisine (gmail, yandex vb farketmez) mail göndereceksek SMTP bilgilerine ihtiyaç duyarız

//Connect to mail server, mail göndermek için mail server a bağlanmak gerekir, aşağıdaki kod yapıyor bunu
// const transporter = nodemailer.createTransport({ //transporter mail gönderen objemiz
//     // SMTP
//     host: 'smtp.ethereal.email', //mail göndereceğim server adresi, yukarıdaki fake mail bilgilerinden aldık
//     port: 587,
//     secure: false, //alternatifi SSL veya TLS olabilir
//     auth: {
//         user: 'ntqxavoiba6ulmhd@ethereal.email',
//         pass: 'wfNZNWMcmPeJhw73qG'
//     }
// })
// console.log(transporter);

//* SEND MAIL; artık mail gönderebiliriz;
// transporter.sendMail({
//     from: 'ntqxavoiba6ulmhd@ethereal.email', // from yazılmak zorunda değil, mail kimden gidiyor onu belirtir, buraya başka mail adresi yazarsan spam a düşer
//     to: 'aliigurel@gmail.com, info.ephesuss@gmail.com', // birden fazla adres yazabiliriz
//     subject: 'Hello',
//     text: 'Hello There. How are you?',
//     html: '<b> Hello There.</b> <p>How are you</p>'
// }, (error, success)=>{
//     success ? console.log('SUCCESS', success) : console.log('ERROR',error);
// })

//* Google Mail yani GMAIL servisi
//* Google -> AccountHome -> Security -> Two-Step-Verify -> App-Passwords
//gmaile başlamadan önce yukardaki kodları yoruma al
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'aliigurel@gmail.com',
//         pass: 'fduo krkf tgok amdr' //gerçek mail pass imiz değil, gmailden aldık bu şifreyi
        // browserdan Gmaili aç, Hesabını Yönet -> Security -> Two-Step-Verify -> App-Passwords a gir
        // Uygulama adına nodemailer yazdık (farketmez), oluştur de şifreyi al
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
//*Static Files
// '/uploads' ile başlayan bir istek urlde gelirse bu dosya seni ilgilendirmez bu bir static dosyadır, bu dosyaları '/uploads' klasöründe bulabilirsin demek
//app.use /uploads ile başlayan tüm url ler demek miş
app.use('/uploads', express.static('/uploads') )

/* ------------------------------------------------------- */

// errorHandler:
app.use(require('./src/middlewares/errorHandler'))

// RUN SERVER:
app.listen(PORT, () => console.log('http://127.0.0.1:' + PORT))

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')() // !!! It clear database.