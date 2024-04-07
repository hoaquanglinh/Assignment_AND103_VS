const express = require('express')
const app = express();
const port = 3000
const mongoose = require('mongoose');

const cayModel = require('./model/cayModel')

const path = require('path');
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.listen(port, () => {
    console.log(`Server đang chạy ở cổng ${port}`)
})

const uri = 'mongodb+srv://slide3:123@sanpham.9silvsv.mongodb.net/Assignment'

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

const api = require('./api');
app.use('/api', api)

try {
    mongoose.connect(uri)
    console.log('Ket noi thanh cong');
} catch (error) {
    console.log('Loi: ', error);
}

app.get('/', async (req, res) => {
    let cay = await cayModel.find();

    res.send(cay)
})