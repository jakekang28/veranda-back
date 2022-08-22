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
                res.send(results)
            }
        })    
        })        
    },
    insert : (req, res) => {
        fs.readFile('../../views/home/insert.html','utf8',function(err, data) {
            res.send(data);
        })
    },
    edit : (req, res) => {
        fs.readFile('edit.ejs','utf8',function (err, data) {
            db.query('SELECT * FROM article WHERE id = ?',[req.params.id],function(err,result){
                res.send(result);
            })
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
        db.query("INSERT INTO article (id, title, article) values (?, ?, ?);",[
            body.id,
            body.title,
            body.article
        ], function() {
            res.redirect('/articles')
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