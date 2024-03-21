const express = require('express')
const router = express.Router();
const cayModel = require('./cayModel')
const mongoose = require('mongoose');
const upload = require('./config/common/upload')
const path = require('path');

module.exports = router;

router.get('/', (req, res) => {
    res.send('Vao api Moblie')
})

const uri = 'mongodb+srv://slide3:123@sanphams.9silvsv.mongodb.net/Assignment'

router.get('/list', async (req, res) => {
    await mongoose.connect(uri)

    let cay = await cayModel.find();

    res.send(cay)
})

router.post('/add', async (req, res) => {
    try {
        const newCay = new cayModel(req.body);
        await newCay.save();
        res.status(201).send('Dữ liệu đã được thêm thành công');
    } catch (error) {
        console.error('Lỗi khi thêm dữ liệu:', error);
        res.status(500).send('Đã xảy ra lỗi khi thêm dữ liệu');
    }
});

// router.post('/add', upload.single('image'), async (req, res) => {
//     try {
//         const { ten, gia, kichthuoc } = req.body;
//         const tenAnh = req.file.filename;
        // const url = `${req.protocol}://${req.get("host")}/api/gallery/${tenAnh}`

//         const newCay = new cayModel({
//             ten: ten,
//             anh: tenAnh,
//             gia: gia,
//             kichthuoc: kichthuoc,
//         });

//         await newCay.save();
//         res.status(201).send('Dữ liệu đã được thêm thành công');
//     } catch (error) {
//         console.error('Lỗi khi thêm dữ liệu:', error);
//         res.status(500).send('Đã xảy ra lỗi khi thêm dữ liệu');
//     }
// });

router.get('/gallery/:imageName', async (req, res) => {
    await mongoose.connect(uri)
    try {
        const imageName = req.params.imageName;

        // const cay = await cayModel.findOne({ anh: imageName });

        // if (!cay) {
        //     return res.status(404).send('Không tìm thấy ảnh');
        // }

        res.render('gallery', { images: [imageName] });
    } catch (error) {
        console.error('Lỗi khi tìm ảnh:', error);
        res.status(500).send('Đã xảy ra lỗi khi tìm ảnh');
    }
});


router.delete('/delete/:id', async (req, res) => {
    try {
        await mongoose.connect(uri);

        let id = req.params.id;
        let result = await cayModel.deleteOne({ _id: id });

        if (result) {
            res.json({
                "status": 200,
                "messenger": "Xóa thành công",
                "data": result
            });
        } else {
            res.json({
                "status": 400,
                "messenger": "Lỗi, xóa không thành công",
                "data": []
            });
        }
    } catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error);
        res.status(500).send('Lỗi máy chủ nội bộ');
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        await mongoose.connect(uri);

        const id = req.params.id;
        const data = req.body;

        const updateFruit = await cayModel.findByIdAndUpdate(id, data, { new: true });

        res.json({
            "status": 200,
            "messenger": "Cập nhật thành công",
            "data": updateFruit
        });
    } catch (error) {
        console.error('Lỗi khi cập nhật sản phẩm:', error);
        res.status(500).send('Lỗi máy chủ nội bộ');
    }
});