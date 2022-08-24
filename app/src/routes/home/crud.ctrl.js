"use strict";

const multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
    destination : function (req, file, cb) {
        cb(null, "public/images");
    },
    filename : function(req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, path.basename(file.originalname, ext) = "-" + Date.now() + ext);
    },
});
var upload = multer({ storage : storage});

const fs = require('fs');
const db = require('../../config/db.js');
const ejs = require('ejs');
const output = {
    read : (req, res) => {
        fs.readFile('../../views/home/admin.ejs','utf8', function(err, data) {
        db.query('SELECT * FROM article', function(err, results) {
            if(err) {
                res.send(err)
            } else {
                res.render('home/admin',{data : results})
            }
        })    
        })        
    },
    delete : (req, res) => {
        db.query('DELETE FROM article WHERE id = ?',[req.params.id],function(){
            res.redirect('/articles')
        })
    },
    insert : (req, res) => {
        db.query('SELECT * FROM article;',function(err, data,fields){
            if(err){
                console.log(err);
                res.status(500).send('Internal Server Error');
            } else {
                res.render('home/insert',{data : data[0]});
            }
        })
    },
    edit : (req, res) => {
        db.query('SELECT * FROM article;',function(err, results){
            var id = req.params.id;
            if(id){
                db.query('SELECT * FROM article WHERE id = ?;',[id],function(err,data,fields){
                    if(err){
                        console.log(err);
                        res.status(500).send('Internal Server Error');
                    } else {
                        res.render('home/edit',{data : results});
                    }
                })
            }
            else {
                console.log(err);
                res.status(500).send("Internal Server Error");
            }
        })
    }
}
const manipulate = {
    
    insert : (req, res) => {
        const body = req.body;
        var title = body.title;
        var description = body.article;
        const image = `images/${req.body.image}`;
        db.query("INSERT INTO article (title, article, image) values (?, ?, ?);",[
            title,
            description,
            image
        ], function(err, row, fields) {
            if(err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
            } else {
                res.redirect('/articles')
            }
        })
    },
    edit : (req, res) => {
        const body = req.body;
        db.query('UPDATE article SET title = ?, article = ? WHERE id = ?', [body.title,body.article,req.params.id],function() {
            res.redirect('/articles');
        })
    }
}

module.exports = {
    output,
    manipulate
}