"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");
const ctrl_article = require("../crud/crud.ctrl");

router.get('/', ctrl.output.hello);
router.get('/login', ctrl.output.login);
router.post('/login', ctrl.process.login);
router.get('/register',ctrl.output.register);
router.post('/register',ctrl.process.register);

router.get('/articles', ctrl_article.read);
module.exports = router;