"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/token:

const pizza = require('../controllers/pizza')
const {isAdmin} = require('../middlewares/permissions')

/* ------------------------------------------------------- */
// //*UPLOAD
// //? $ npm i multer
// // https://expressjs.com/en/resources/middleware/multer.html
// // multer, form-data (yani dosya gönderileri) verileri kabul eder, yani dosya yükleme yapılabilir
// const multer = require('multer')
// const upload = multer({ //bu bi middleware ama genel değil, lazım olan yerde çağırdığımız bi middlewae, index.js de çağırdıklarımız genel middleware, permissions lar gibi
//     // dest: './uploads', //dosyaları bu isimli klasöre ekle demek ama bunu kullanmıcaz, daha fazla ayar içeren storage kullanacaz
//     storage: multer.diskStorage({
//         destination: './uploads', //dosyaları bu klasöre yükle
//         filename: function (req,file, returnCallback){
//             // returnCallback(error, filename)
//             // returnCallback(null, 'ceral.jpg') //kaydedilecek dosyaya bu adı ver
//             // returnCallback(null, file.originalname)//dosyayı kendi orjina adıyla yükler
//             returnCallback(null, Date.now() + '-' + file.originalname)//dosyayı kendi orjina adıyla yükler
            
//         }
//     })
// })

const upload = require('../middlewares/upload')
/* ------------------------------------------------------- */

// URL: /pizzas

router.route('/')
    .get(pizza.list)
    //single, sadece tek bir dosya yüklememe izin verir
    // .post(isAdmin, upload.single('fileInputName'), pizza.create)
    // array, aynı anda birden fazla dosya yüklemek için, tavsiye edilen array dir
    .post(isAdmin, upload.array('images'), pizza.create)
    //any(): inputun adı nolursa olsun, kaç adet olursa olsun al yükle demek ama tercih edilmez
    // .post(isAdmin, upload.any(), pizza.create)

router.route('/:id')
    .get(pizza.read)
    .put(isAdmin, upload.array('images'), pizza.update)
    .patch(isAdmin, upload.array('images'), pizza.update)
    .delete(isAdmin, pizza.delete)

/* ------------------------------------------------------- */
module.exports = router