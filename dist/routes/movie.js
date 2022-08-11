"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const movieController_1 = require("../controller/movieController");
router.post('/create', auth_1.auth, movieController_1.Movies);
router.get('/read', movieController_1.getMovies);
router.get('/read/:id', movieController_1.getSingleMovie);
router.patch('/update/:id', auth_1.auth, movieController_1.updateMovies);
router.delete('/delete/:id', auth_1.auth, movieController_1.deleteMovies);
exports.default = router;
