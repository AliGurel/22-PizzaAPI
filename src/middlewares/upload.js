"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */

//MULTER bi middleware ama genel değil, lazım olan yerde çağırdığımız bi middleware, permissions lar gibi yani,  index.js de çağırdıklarımız genel middleware, 

//pizza route da kullandık bu middleware i 
//TC de dosya upload ederken Form kısmındaki Files kutucuğu işaretle, altta açılan field name kısmına route da .put(isAdmin, upload.array('images'), pizza.update) kısmında array in içindeki isim neyse o yazılmak zorunda, sonra da dosya seç denip istenen dosya eklenebilir

//*UPLOAD
//? $ npm i multer
// https://expressjs.com/en/resources/middleware/multer.html
// multer, form-data (yani dosya gönderileri) verileri kabul eder, yani dosya yükleme yapılabilir
const multer = require('multer')
module.exports = multer({ 
    // dest: './uploads', //dosyaları bu isimli klasöre ekle demek ama bunu kullanmıcaz, daha fazla ayar içeren storage kullanacaz
    storage: multer.diskStorage({
        destination: './uploads', //dosyaları uploads isimli klasöre yükle
        filename: function (req, file, returnCallback){
            // returnCallback(error, filename)
            // returnCallback(null, 'ceral.jpg') //kaydedilecek dosyaya bu adı ver
            // returnCallback(null, file.originalname)//dosyayı kendi orjina adıyla yükler
            returnCallback(null, Date.now() + '-' + file.originalname)//dosyayı kendi orjina adıyla yükler
            //console.log(file) //yaptığımızda originalname in geldiğini görebiliriz
            // ilk parametre olan null hata verme demek
            
        }
    })
})