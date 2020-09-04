const express = require('express');
const logger = require('morgan');
const jwt = require('jsonwebtoken');
const path = require('path');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const { autoIncrement } = require('mongoose-plugin-autoinc');
const moment = require('moment');
const float = require('mongoose-float').loadType(mongoose);
const cors = require('cors');
const stringify = require('json-stable-stringify');
const _ = require('lodash');
const axios = require('axios');
const expressValidator = require('express-validator')
const isImage = require('is-image');
const fs = require('fs');
const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const rbTree = require('functional-red-black-tree')
const mime = require('mime');
const excel = require('exceljs')
const finds = require('find');
const find = require('find-file-up');

const objectHash = require('object-hash')
const multer = require('multer')
const uuid = require('uuid')
const del = require('del')
const ini = require('ini')
const chokidar = require('chokidar')

Joi.objectId = () => Joi.string().regex(/^[a-f\d]{24}$/i).error(e => new Error(`Field "${e[0].local.key}" is not a valid ObjectID`))
Joi.momentJS = () => Joi.string().regex(/^\d{4}\-\d{2}\-\d{2}T\d{2}\:\d{2}\:\d{2}\+\d{2}\:\d{2}$/).error(e => new Error(`Field "${e[0].local.key}" is not a valid momentJS date string`))
Joi.time = () => Joi.string().regex(/^\d{2}\:\d{2}$/).error(e => new Error(`Field "${e[0].local.key}" is not in valid time format HH:mm`))

module.exports = {
    express,
    logger,
    jwt,
    path,
    cookieParser,
    bcrypt,
    mongoose,
    beautifyUnique,
    autoIncrement,
    moment,
    float,
    cors,
    stringify,
    _,
    axios,
    expressValidator,
    isImage,
    fs,
    Joi,
    rbTree,
    path,
    mime,
    fs,
    objectHash,
    multer,
    uuid,
    del,
    excel,
    find,
    ini,
    chokidar
}