const express = require("express");
const router = express.Router();
const { responsers, isAuthenticated } = require("../helpers/index");
// const jwt = require("jsonwebtoken");

// Load Controllers
router.use( "/signin", require( "../controllers/auth.js" ) );
router.get( "/signout", isAuthenticated, async( req, res, next ) => {
  // Pendiente matar session, ya que tiene una duracion de una hora
  
  // const token = req.headers.authorization.split(" ")[1];
  // if( token === null )
  //   return await responsers(res, 401, "Access Denied.");
  // jwt.verify( token, process.env.SECRET_KEY, ( err, payload ) => {
  //   console.log(payload)
  //   if (err) return this.responsers(res, 403, "Token expired");
  // });
  return await responsers(res, 201, "Logout has been successful.");
});
router.use( "/products", isAuthenticated, require( "../controllers/products.js" ) );

module.exports = router;