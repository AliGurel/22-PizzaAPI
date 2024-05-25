"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */

//sendMail(to, subject, message):
//* Bu fonk u mail gödnermek istediğimiz zaman çağııp kullanıcaz
// Örneğin bir user kaydolduğunda hışgeldin maili gönerebiliriz, bunun için user.controller da bu fonk çağırdık
//bir sipariş oluşturulduğunda da bir mail gönderebiliriz, order.controller da mesela olabilir create de

const nodemailer = require('nodemailer')

module.exports = function (to, subject, message) {
    //* EMAIL
    // nodemailer modülü kullanılacak
    // https://www.nodemailer.com/
    // https://www.npmjs.com/package/nodemailer
    // https://ethereal.email/ // fake mail servisi


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
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'aliigurel@gmail.com',
            pass: 'fduo krkf tgok amdr' //gerçek mail pass imiz değil, gmailden aldık bu şifreyi
            // browserdan Gmaili aç, Hesabını Yönet -> Security -> Two-Step-Verify -> App-Passwords a gir
        // Uygulama adına nodemailer yazdık (farketmez), oluştur de şifreyi al
        }
    })

    transporter.sendMail({
        // from: 'aliigurel@gmail.com', //yazılmayabilir
        //to, subject, message parametreleri fonksiyon çağrıldığında gönderilecek
        to: to, //'info.ephesuss@gmail.com, aliigurel@gmail.com',
        subject: subject, //'Deneme',
        text: message, //'Hello There. How are you?', // ikisi birden kullanılabbilir
        html: message, //'<b> Hello There.</b> <p>How are you</p>'
    }, (error, success) => console.log(success, error))


    // //? YandexMail (yandex):
    // const transporter = nodemailer.createTransport({
    //     service: 'Yandex',
    //     auth: {
    //         user: 'username@yandex.com',
    //         pass: 'password' // your emailPassword, mail adrsinin passi, google gibi değil
    //     }
    // })
}