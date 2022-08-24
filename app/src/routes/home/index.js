"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");
const ctrl_article = require("./crud.ctrl");

router.get('/', ctrl.output.hello);
router.get('/login', ctrl.output.login);
router.post('/login', ctrl.process.login);
router.get('/register',ctrl.output.register);
router.post('/register',ctrl.process.register);

router.get('/articles',ctrl_article.output.read);
router.get('/articles/delete/:id', ctrl_article.output.delete);
router.get('/articles/insert',ctrl_article.output.insert);
router.get('/articles/edit/:id',ctrl_article.output.edit);
router.post('/articles/insert',ctrl_article.manipulate.insert);
router.post('/articles/edit/:id', ctrl_article.manipulate.edit);
module.exports = router;