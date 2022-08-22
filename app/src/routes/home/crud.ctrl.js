"use strict";
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
                res.send(results);
            }
        })    
        })        
    },
    insert : (req, res) => {
        db.query('SELECT * FROM article;',function(err, data,fields){
            if(err){
                console.log(err);
                res.status(500).send('Internal Server Error');
            } else {
                res.render('home/insert',{articles : data});
            }
        })
    },
    edit : (req, res) => {
        db.query('SELECT * FROM article;',function(err, data,fields){
            var id = req.params.id;
            if(id){
                db.query('SELECT * FROM article WHERE id = ?;',[id],function(err,data,fields){
                    if(err){
                        console.log(err);
                        res.status(500).send('Internal Server Error');
                    } else {
                        res.render('home/edit');
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
    delete : (req, res) => {
        db.query('DELETE FROM article WHERE id = ?',[req.params.id], function (){
            res.redirect('/articles');
        })  
    },
    insert : (req, res) => {
        const body = req.body;
        var title = body.title;
        var description = body.article;
        db.query("INSERT INTO article (title, article) values (?, ?);",[
            title,
            description
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