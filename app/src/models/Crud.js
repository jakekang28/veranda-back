"use strict";

const db = require("../config/db.js");

class Crud{
    constructor(body) {
        this.body = body;
    }

    static readall() {
        db.query("Select * from articles", function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                console.log("articles :", res);
                result(null, res);
            }
        });
    }

    static read(artnum) {
        return new Promise((resolve, reject)=> {
            db.query("SELECT * FROM article WHERE AcNUM = ?", [id],(err, rows, fields) => {
                if(err) reject(err);
                resolve(res.send(rows));
            });
        });
    }
}

module.exports = Crud;