"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const auth_controller_1 = require("../controllers/auth.controller");
const router = express.Router();
router.post('/register', auth_controller_1.register);
router.post('/login', auth_controller_1.login);
module.exports = router;
