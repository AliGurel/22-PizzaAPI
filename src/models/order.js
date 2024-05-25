"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- */

const OrderSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
        //unique değil, çünkü bir kullancı birden fazla pizza sipariş verebilir
    },
    pizzaId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Pizza',
        required: true
        // unique değil çünkü bir pizzayı birden fazla kullanıcı alabilir
    },
    size: {
        type: String,
        trim: true,
        required: true,
        enum: ['Small','Medium','Large','XLarge']
    },
    quantity: {
        type: Number,
        default: 1
    },
    price: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        default: function(){ return this.quantity * this.price}, // default sadece create de çalışıyor
        transform: function(){ return this.quantity * this.price}, // update de de çalışması için ayrıca body den manuel amount gönderilmesini engeller
        // transfom, default un update hali
        //veya yukardakiler yerine sadece set de kullanabiliriz, ancak body de veri gönderilmezse set patlıyor;
        //set: function(){ return this.quantity * this.price} // hem create hem update de çalışır
        
    }
},{
    collection:'orders',
    timestamps: true
})

module.exports = mongoose.model('Order', OrderSchema)