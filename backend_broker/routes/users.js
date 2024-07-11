var express = require('express');
var router = express.Router();
const { body } = require('express-validator');
const conexionController = require('../app/controls/ConexionBroker');
var conexion = new conexionController();
let jwt = require('jsonwebtoken');

//Middleware ----- filtro para peticiones //autentificacion
var auth = function middleware(req, res, next) {
  const token = req.headers['x-api-token'];
  if (token) {
    require("dotenv").config();
    const llave = process.env.KEY;
    jwt.verify(token, llave, async (err, decoded) => {
      if (err) {
        res.status(401);
        res.json({ msg: "token expirado o no valido", code: 401 });
      } else {
        var models = require('../models');
        req.decoded = decoded;
        let aux = await models.cuenta.findOne({ where: { external_id: req.decoded.external} });
        if (!aux) {
          res.status(401);
          res.json({ msg: "token no valido", code: 401 });
        } else {
          next();
        }
      }
    });
  } else {
    res.status(401);
    res.json({ msg: "No existe token", code: 401 });
  }
}


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.json({ "version": "1.0", "name": "CONEXION BROKER" });
});



module.exports = router;
