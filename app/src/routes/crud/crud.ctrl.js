"use strict";

const Crud = require("../../models/Crud");

const crud = {
    read : (req, res) => {
        const manipulator = new Crud(req.body);
        const response = manipulator.readall;
        return res.json(response);
    }
};

module.exports = crud;