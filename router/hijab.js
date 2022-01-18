const express = require('express')
const router = express.Router()
const hijabControllers = require('../controllers/hijab')
const fs = require('fs');
var multer = require('multer');
var path = require('path');
const Hijab = require('../models/hijab');
const storage = multer.diskStorage({
    destination: (hijabControllersreq, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
const upload = multer({ storage: storage, limits: { fieldSize: 10 * 1024 * 1024 } })

router.route('/hijab')
        .get(hijabControllers.index)
router.route('/hijab').post(upload.single('image'), (req, res, next) => {
    const hijab = new Hijab({
        nama: req.body.nama,
        harga: req.body.harga,
        ket: req.body.ket,
        img: {
            data: fs.readFileSync(path.join(__dirname, '../' + '/uploads/' + req.file.filename)),
            contentType: 'image/jpg'
        }
    });
    hijab.save(function (error) {
        if (error) return handleError(error);
        res.redirect('/hijab')
    });
});
router.route('/hijab/update').post(upload.single('image'), (req, res, next) => {
    const _id = req.body._id
    const nama = req.body.nama
    const harga = req.body.harga
    const ket = req.body.ket
    const filter = { _id: _id };
    const update = {
        _id: _id,
        nama: nama,
        harga: harga,
        ket: ket,
        img: {
            data: fs.readFileSync(path.join(__dirname, '../' + '/uploads/' + req.file.filename)),
            contentType: 'image/jpg'
        }
    };
    Hijab.updateOne(filter, update, function (err) {
        res.redirect('/hijab')
    });
});
router.get ('/hijab/create', hijabControllers.create)
router.get ('/hijab/:id', hijabControllers.show)

router.route('/hijab/update').post(hijabControllers.baharui)
router.get('/hijab/hapus/:id', hijabControllers.hapus)
router.route('/hijab/update/:_id/:nama/:harga/:ket').get(hijabControllers.renderUpdate)

router.put('/hijab/:idhijab', hijabControllers.update)

//HAPUS DATA
router.delete('/hijab/:idhijab', hijabControllers.delete)

router.put('/hijab/:id', hijabControllers.update)
router.delete('/hijab/:id', hijabControllers.delete)

module.exports = router