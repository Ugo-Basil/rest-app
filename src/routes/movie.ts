import express, {Request, Response, NextFunction} from 'express'
import { auth } from '../middleware/auth'

const router = express.Router();

import {Movies, getMovies, getSingleMovie, updateMovies, deleteMovies} from '../controller/movieController'

router.post('/create',auth, Movies);
router.get('/read', getMovies);
router.get('/read/:id', getSingleMovie)
router.patch('/update/:id',auth, updateMovies)
router.delete('/delete/:id',auth, deleteMovies)

export default  router;
