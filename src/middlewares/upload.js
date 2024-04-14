"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */

//*UPLOAD
//? $ npm i multer
// https://expressjs.com/en/resources/middleware/multer.html
// multer, form-data (yani dosya gönderileri) verileri kabul eder, yani dosya yükleme yapılabilir
const multer = require('multer')
module.exports = multer({ //bu bi middleware ama genel değil, lazım olan yerde çağırdığımız bi middlewae, index.js de çağırdıklarımız genel middleware, permissions lar gibi
    // dest: './uploads', //dosyaları bu isimli klasöre ekle demek ama bunu kullanmıcaz, daha fazla ayar içeren storage kullanacaz
    storage: multer.diskStorage({
        destination: './uploads', //dosyaları bu klasöre yükle
        filename: function (req,file, returnCallback){
            // returnCallback(error, filename)
            // returnCallback(null, 'ceral.jpg') //kaydedilecek dosyaya bu adı ver
            // returnCallback(null, file.originalname)//dosyayı kendi orjina adıyla yükler
            returnCallback(null, Date.now() + '-' + file.originalname)//dosyayı kendi orjina adıyla yükler
            
        }
    })
})