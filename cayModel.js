const mongoose = require('mongoose');
const caySchema = mongoose.Schema({
    ten: {
        type: String,
        require: true
    },
    anh: {
        type: String
    },
    gia: {
        type: Number,
        require: true
    },
    kichthuoc: {
        type: String,
        require: true
    }
})

const cayModel = mongoose.model('sanpham', caySchema)

module.exports = cayModel;