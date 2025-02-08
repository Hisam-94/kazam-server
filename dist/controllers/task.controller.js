"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTasks = exports.createTask = void 0;
const task_model_1 = __importDefault(require("../models/task.model"));
const validate_1 = require("../middlewares/validate");
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { error } = validate_1.taskSchema.validate(req.body);
        if (error)
            return res.status(400).send({ message: error.message });
        const task = yield task_model_1.default.create(Object.assign(Object.assign({}, req.body), { user: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id }));
        res.status(201).send(task);
    }
    catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
});
exports.createTask = createTask;
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const tasks = yield task_model_1.default.find({ user: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id });
        res.send(tasks);
    }
    catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
});
exports.getTasks = getTasks;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const task = yield task_model_1.default.findOneAndUpdate({ _id: req.params.id, user: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id }, req.body, { new: true });
        if (!task)
            return res.status(404).send({ message: 'Task not found' });
        res.send(task);
    }
    catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const task = yield task_model_1.default.findOneAndDelete({
            _id: req.params.id,
            user: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id
        });
        if (!task)
            return res.status(404).send({ message: 'Task not found' });
        res.send({ message: 'Task deleted successfully' });
    }
    catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
});
exports.deleteTask = deleteTask;
