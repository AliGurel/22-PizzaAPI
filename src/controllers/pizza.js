"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Pizza Controller:

const Pizza = require('../models/pizza')

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["Pizzas"]
            #swagger.summary = "List Pizzas"
            #swagger.description = `
                You can send query with endpoint for filter[], search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

        const data = await res.getModelList(Pizza, {}, 'toppingIds') // toppingIds, populate için

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Pizza),
            data
        })
    },

    // CRUD:

    create: async (req, res) => {
        /*
            #swagger.tags = ["Pizzas"]
            #swagger.summary = "Create Pizza"
        */

        const data = await Pizza.create(req.body)

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Pizzas"]
            #swagger.summary = "Get Single Pizza"
        */

        const data = await Pizza.findOne({ _id: req.params.id }).populate('toppingIds')

        res.status(200).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["Pizzas"]
            #swagger.summary = "Update Pizza"
        */
       //upload.single yapıldıysa dosyalar req.file 
       //upload.array veya any yapıldıysa req.files içinde gelir yüklenen dosyalar resimler

        /* dosyalar bu formaata gelir upload.array yapıldıysa pizza route ta ki biz array yaptık
            {
                fieldname: 'images',
                originalname: 'papagan.jpeg',
                encoding: '7bit',
                mimetype: 'image/jpeg',
                destination: './uploads',
                filename: '1711659209665-papagan.jpeg',
                path: 'uploads/1711659209665-papagan.jpeg',
                size: 7270
            }
        */
        // Gelen dosya verilerini DB ye aktarıyoruz
        //önceden yüklenmiş olan resimleri silmemek için;
        const pizza = await Pizza.findOne({ _id: req.params.id }, {_id:false, images: true}) //güncelleme yapmadan önce pizza datası içinden sadece images verileri gelsin, id gelmesin, yani eski resimleri de al db ye aktarmadan önce
        //artık bu pizza değişkeni içinde eğer var idiyse eski pizza resimleri var

        for (let file of req.files) { //her bir file dosyasını file isimli değişkene ata
            //yeni resimleri mevcut pizza resimlerine ekle
            // pizza.images.push(file.filename)//sadece dosya adını ekler
            pizza.images.push('/uploads/' + file.filename) //sadece dosya adını ekleme dosya yolunu da ekle
        }
        //pizza resimlerini req.body e aktar
        req.body.images = pizza.images

        const data = await Pizza.updateOne({ _id: req.params.id }, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            data,
            new: await Pizza.findOne({ _id: req.params.id })
        })
    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Pizzas"]
            #swagger.summary = "Delete Pizza"
        */

        const data = await Pizza.deleteOne({ _id: req.params.id })

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })
    }
}