"use strict";

const output = {
   hello : (req,res) => {
    res.render("home/index");
   },
   login : (req, res) => {
    res.render("home/login");
   }
}
const users = {
    id : ["jakekang28", "asdf", "asdf2"],
    psword : ["kjh0628", "1234", "123456"],
};

const process = {
    login : (req, res) => {
        const id = req.body.id,
            psword = req.body.psword;

        if(users.id.includes(id)){
            const idx = users.id.indexOf(id);
            if(users.psword[idx] === psword) {
                return res.json({
                    success: true,
                });
            }
        }
        return res.json({
            success : false,
            msg : "Login Failed",
        });    
    },
};

module.exports = {
    output,
    process
};