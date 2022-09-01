"use strict";

const fs = require("fs");
const db = require('../../config/db.js');
const express = require("express");
const router = express.Router();
const path = require('path');
const multer = require("multer");
const ctrl = require("./home.ctrl");
const ctrl_article = require("./crud.ctrl");
var storage = multer.diskStorage({
    destination : function (req, file, cb) {
        cb(null, "./src/public/images");
    },
    filename : function(req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, file.originalname);
    },
    //path.basename(file.originalname, ext)
});
var storage2 = multer.diskStorage({
    destination : function (req, file, cb) {
        cb(null, "./src/public/thumbnail");
    },
    filename : function(req, file, cb) {
        const ext = path.extname(file.originalname);
        const now = Date.now();
        cb(null, now + file.originalname);
    },
    //path.basename(file.originalname, ext)
});
var upload = multer({storage : storage});
var thumbnail = multer({storage : storage2});

router.get('/', ctrl.output.hello);
router.get('/login', ctrl.output.login);
router.post('/login', ctrl.process.login);
router.get('/register',ctrl.output.register);
router.post('/register',ctrl.process.register);

router.get('/articles',ctrl_article.output.read);
router.get('/hello',function(req, res){
    res.send("hello");
})
router.get('/articles/delete/:id', ctrl_article.output.delete);
router.get('/articles/insert',ctrl_article.output.insert);
router.get('/articles/edit/:id',ctrl_article.output.edit);
router.get('/articles/viewarticle/:id',function(req, res) {
    var id = req.params.id;
     db.query("SELECT * FROM article WHERE id = ?",[id],function(err, data){
        if(err) {
            res.send(err);
        }else{
       res.send(data[0])
    }
    })
})
router.post('/articles/insert', upload.single("image"),ctrl_article.manipulate.insert);
router.post('/articles/upload', thumbnail.single("image"), function(req, res) {
    var filename = req.file.filename;
    res.send(filename);
})
router.get('/images/:filename',function(req, res){
    var filename = req.params.filename;
    res.sendFile(path.join(__dirname + "/../../public/thumbnail/" + filename))
})
router.post('/articles/edit/:id', ctrl_article.manipulate.edit);

module.exports = router;
