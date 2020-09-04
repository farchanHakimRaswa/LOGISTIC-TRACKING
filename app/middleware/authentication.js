const include = require('../include');

const Staff = require('./../models/staffModel');

const config = require('../config');

const jwt = include.jwt;

const Constant = require('../constant.js')

async function verifyToken(req, res, next) {
  const token = req.headers['authorization']
  if (token) {
    try {
      let decoded = await jwt.verify(token.split(" ")[1], config.SECRET)
      let id = decoded.tokenStaff.id
      let user = await Staff.findById(id).exec()
      if (user) next()
      else res.status(401).json(Constant.errorToken)
    } catch (err) {
      res.status(401).json(Constant.errorToken)
    }
  }
  else {
    res.status(401).json(Constant.errorToken)
  }
}

exports.verifyToken = verifyToken;