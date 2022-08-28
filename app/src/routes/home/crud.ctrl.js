"use strict";

const path = require("path");
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
    view : (req, res) => {
        const id = req.params.idx;
        db.query("SELECT * FROM article WHERE id = ?;",[id],function(err, data){
            if(err){
                console.log(err);
                res.status(500).send('Internal Server Error');
            } else {
                console.log(data[0]);
                // res.render("home/read",{data : data[0]});
                res.send(data);
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
        const tempPath = req.file.path;
        // const targetPath = path.join(__dirname, `../../public/images/${body.image}`)
        db.query("INSERT INTO article (title, article, image) values (?, ?, ?);",[
            title,
            description,
            tempPath
        ], function(err, row) {
            if(err) {
                console.log("err : " + err);
                res.status(500).send('Internal Server Error');
            } else {
                console.log("rows " + JSON.stringify(row));
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
    manipulate,
}