
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const CryptoJS = require("crypto-js");
const models = require("../models/index");

exports.responsers = (res, code, message, data = []) => {
  // const codes = [200, 201, 202, 204, 400, 401, 402, 403, 404, 405, 406, 409, 410, 500, 501, 502, 503];
  return res.status( code ).json({
    code: code,
    msg: message,
    status: ( code > 300 ) ? false : true,
    data: data,
  });
};

exports.generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET_KEY, { algorithm: "HS512", expiresIn: "1d" });
};

exports.isAuthenticated = (req, res, next) => {
  const { authorization } = req.headers
  if( !authorization )
    return this.responsers( res, 406, "Missing Header" );
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1];
  if( token === null ) return responsers(res, 401, "Access Denied.");
  jwt.verify( token, process.env.SECRET_KEY, ( err, payload ) => {
    if (err) return this.responsers(res, 403, "Token expired");
    req.user = payload;
    next();
  });

};

exports.validateIfExistsSession = async (TokenModel, user_id) => {
  const tokenSession = await TokenModel.findOne({
    where: { user_id: user_id, revoke: false },
  });
  if (tokenSession === null) return 0;
  jwt.verify( tokenSession.dataValues.token, process.env.SECRET_KEY, ( err, payload ) => {
    if( err ) return 1;
  });
};

exports.generatePassword = (string) => {
  return bcrypt.hash(string, 10);
};
exports.isValidPassword = async(pwd1, pwd2) => {
  return await bcrypt.compare( pwd1, pwd2 );
};
exports.generateUUID = () => {
  return uuidv4();
};

exports.encrypt = (data) => {
  return CryptoJS.AES.encrypt(data, process.env.SECRET_KEY).toString();
};
exports.decrypt = (encrypt) => {
  return CryptoJS.AES.decrypt(encrypt, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);
};

exports.generatesKeys = () => {
  require( "crypto" ).generateKeyPairSync( "rsa", {
    // The standard secure default length for RSA keys is 8192 bits
    modulusLength: 8192,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
      cipher: 'aes-256-cbc',
      passphrase: 'top secret'
    }
  }, (err, publicKey, privateKey ) => {
    if( err )
      console.log(err)
    console.log( publicKey, privateKey )
  });
}