import express, {Request,Response, NextFunction } from 'express'
const router = express.Router()
import {RegisterUser, LoginUser, getUsers} from '../controller/userController'

router.get('/register', (req:Request, res:Response, next:NextFunction) => {
    res.render("register")
})
router.post('/register', RegisterUser)
router.get('/login', (req: Request, res: Response, next: NextFunction) => {
    res.render('login')
})
router.post('/login', LoginUser)
router.get('/allusers', getUsers)

export default router;
