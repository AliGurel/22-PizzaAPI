"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */

//sendMail(to, subject, message):

const nodemailer = require('nodemailer')

module.exports = function (to, subject, message) {
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
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'aliigurel@gmail.com',
            pass: 'fduo krkf tgok amdr' //gerçek mail pass imiz değil, gmailden aldık bu şifreyi
        }
    })

    transporter.sendMail({
        // from: 'aliigurel@gmail.com', //yazılmayabilir
        to: to, //'info.ephesuss@gmail.com, aliigurel@gmail.com',
        subject: subject, //'Deneme',
        text: message, //'Hello There. How are you?', // ikisi birden kullanılabbilir
        html: message, //'<b> Hello There.</b> <p>How are you</p>'
    }, (error, success)=>console.log(success, error))


    // //? YandexMail (yandex):
    // const transporter = nodemailer.createTransport({
    //     service: 'Yandex',
    //     auth: {
    //         user: 'username@yandex.com',
    //         pass: 'password' // your emailPassword, mail adrsinin passi, google gibi değil
    //     }
    // })
}