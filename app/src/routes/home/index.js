"use strict";

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
        cb(null, path.basename(file.originalname, ext) + "-" + Date.now() + ext);
    },
});
var upload = multer({storage : storage});

router.get('/', ctrl.output.hello);
router.get('/login', ctrl.output.login);
router.post('/login', ctrl.process.login);
router.get('/register',ctrl.output.register);
router.post('/register',ctrl.process.register);

router.get('/articles',ctrl_article.output.read);
router.get('/articles/delete/:id', ctrl_article.output.delete);
router.get('/articles/insert',ctrl_article.output.insert);
router.get('/articles/edit/:id',ctrl_article.output.edit);
router.get(`/${storage.filename}`,ctrl_article.output.view);
router.post('/articles/insert',upload.single("image"),ctrl_article.manipulate.insert);
router.post('/articles/edit/:id', ctrl_article.manipulate.edit);
module.exports = router;