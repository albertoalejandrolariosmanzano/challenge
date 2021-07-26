const express = require("express");
const router = express.Router();
const models = require("../models/index");
const bcrypt = require("bcrypt");

const {
  responsers,
  isValidPassword,
  generateAccessToken,
  validateIfExistsSession
} = require("../helpers/index");

module.exports = router

  .get("/", async (req, res) => {
    return responsers(res, 405, "Method Not Allowed");
  })

  .post("/", async (req, res, next) => {
    const { username:key, password:secret, device_id, how } = req.body;
    const user = await models.Users.findOne({
      where: { key: key },
    });

    if (user === null)
      return responsers(res, 404, "The user has been not found");
    
    if (user.active == 0)
      return responsers(res, 406, "Your account has been blocked, please contact the administrator." );

    const { secret: SecretKey, device_id: DeviceId } = user.dataValues;
    if( !await isValidPassword( secret, SecretKey ) )
      return responsers(res, 409, "The password is invalid");   
    const newToken = await generateAccessToken( user.dataValues );
    const me = await models.Users.findOne({
      where: { id: user.dataValues.id },
      include: [
        { model: models.Rols, as: "rols" },
      ],
    });
    me.dataValues.token = newToken;
    return responsers(res, 200, "Access Granted", me);
  });