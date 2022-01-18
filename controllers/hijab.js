const { req } = require("express")
const res = require("express/lib/response")

//import modul Hijab dari file hijab.js dimodels
//import tabel Hijab
const Hijab = require("../models/hijab")

module.exports = {
    index: function (req, res) {
        let keyword = {}
        //Membuat query pencarian berdasarkan kata kunci
        if (req.query.keyword) {
            keyword = {nama: {$regex: req.query.keyword}}
        }
        Hijab.find(keyword, "nama _id", function (error, hijab) {
            if (error) console.log(error)
            // console.log(hijab)
            res.render('pages/hijab/index',{hijab})
        })
    },

    show: function (req, res) {
        const id = req.params.id

        Hijab.findById(id, function (error, data) {
            if (error) console.log(error)
            // console.log(data)
            res.render('pages/hijab/show', {hijab: data})
        })
    },

    create: function (req, res) {
      res.render('pages/hijab/create')  
    },

    tambah: function (req, res) {
        const hijab = new Hijab({
            nama: req.body.nama,
            harga: req.body.harga,
            ket: req.body.ket,
        })
        hijab.save(function (error) {
            if (error) return handleError(error);
            res.redirect('/hijab')
        })
    },

    update: function (req, res) {
        const id = req.params.idhijab;
        let isFound = false
        console.log(id)
        Hijab.filter(proj => {
            if (proj.idhijab == id) {
                proj.nama = req.body.nama
                proj.harga = req.body.harga
                proj.ket = req.body.ket

                res.send({
                    status: true,
                    data: hijab,
                    message: "Data berhasil diupdate",
                    method: req.method,
                    url: req.url,
                    tanggal: new Date()
                })
                isFound = true
                return proj
            }
        })
        if (isFound == false) {
            res.send({
                status: false,
                message: "Hijab tidak ditemukan"
            })
        }
        res.json(hijab)
    },
    baharui: function (req, res) {
        const _id = req.body._id
        const nama = req.body.nama
        const harga = req.body.harga
        const ket = req.body.ket
        const filter = { _id: _id };
        const update = {
            nama: nama,
            harga: harga,
            ket: ket
        };
        Hijab.updateOne(filter, update, function (err) {
            console.log(nama, harga, ket)
            res.redirect('/hijab')
        });


    },
    renderUpdate: function (req, res) {
        const id = req.params._id
        Hijab.findById(id, function (error, data) {
            if (error) console.log(error)
            res.render('pages/hijab/update', { hijab: data })
        })
    },

    hapus: function (req, res) {
        const id = req.params.id
        Hijab.deleteOne({ _id: id }, function (err) {
            if (err) return console.log(err);
            res.redirect('/hijab')
        });
    },
    delete: function (req, res) { //Menghapus data
        const id = req.params.idhijab;
        let isFound = false
        hijab.filter(proj => {
            if (proj.idhijab == id) {
                const index = hijab.indexOf(pro)
                hijab.splice(index, 1)
                res.send({
                    status: true,
                    data: hijab,
                    message: "Data hijab berhasil dihapus",
                    method: req.method,
                    url: req.url,
                    tanggal: new Date()
                })
                isFound = true
            }
        })
        if (isFound == false) {
            res.json({
                status: false,
                message: "Data tidak ditemukan"
            })
        }
        res.json(hijab)
    }
}