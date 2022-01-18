const mongoose = require('mongoose');
const { Schema } = mongoose

//membuat tabel hijab dengan schema
const hijabSchema = new Schema({
    nama: String,
    harga: String,
    ket: String,
    img: {
        data: Buffer, contentType: String
    },
}, { timestamps: true });
  
//ekspor tabel hijab
const Hijab = mongoose.model('Hijab', hijabSchema)
module.exports = Hijab