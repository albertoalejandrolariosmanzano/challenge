const express = require("express");
const router = express.Router();
const models = require("../models/index");
const { responsers } = require( "../helpers/index" );

module.exports = router
    .get( "/", async (req, res) => {
        const users = await models.Users.findAll({
            include: [
                { model: models.Rols, as: "rols" },
            ]
        });
        return await responsers( res, 200, "", users );
    })