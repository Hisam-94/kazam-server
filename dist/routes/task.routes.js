"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const auth_1 = require("../middlewares/auth");
const task_controller_1 = require("../controllers/task.controller");
const router = express.Router();
router.use(auth_1.auth);
router.route('/')
    .post(task_controller_1.createTask)
    .get(task_controller_1.getTasks);
router.route('/:id')
    .put(task_controller_1.updateTask)
    .delete(task_controller_1.deleteTask);
module.exports = router;
