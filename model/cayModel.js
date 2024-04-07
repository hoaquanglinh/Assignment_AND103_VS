const mongoose = require('mongoose');
const caySchema = mongoose.Schema({
    ten: {
        type: String,
        required: true
    },
    anh: {
        type: String
    },
    gia: {
        type: Number,
        required: true
    },
    kichthuoc: {
        type: String,
        required: true
    }
})

const cayModel = mongoose.model('sanpham', caySchema)

module.exports = cayModel;