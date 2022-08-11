import express, { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid'
import { registerSchema, options, loginSchema, generateToken } from '../utils/utils'
import { UserInstance } from '../model/user';
import bcrypt from 'bcryptjs'
import { MovieInstance } from '../model/movie';

export async function RegisterUser(req: Request, res: Response, next: NextFunction) {
    const id = uuidv4()
   try {
       const validationResult = registerSchema.validate(req.body, options)
       if (validationResult.error) {
           return res.status(400).json({
               Error:validationResult.error.details[0].message
           })
       }
       const duplicateEmail = await UserInstance.findOne({ where: { email: req.body.email } })
       if (duplicateEmail) {
           return res.status(409).json({
               msg:"Email is used, please change the email"
           })
       }

       const duplicatePhone = await UserInstance.findOne({ where: { phonenumber: req.body.phonenumber } })
       if (duplicatePhone) {
           return res.status(409).json({
               msg: "Phone number is used"
           })
       }

       const passwordHash = await bcrypt.hash(req.body.password, 8)

       const record = await UserInstance.create({
        id: id,
        firstname:req.body.firstname,
        lastname: req.body.lastname,
        email:req.body.email,
        phonenumber:req.body.phonenumber,
        password:passwordHash
       })
       res.redirect('/movies/read')
    //    res.status(201).json({
    //        msg: "User successfully registered",
    //        record
    //    })
   } catch (error) {
       res.status(500).json({
           mesg: 'failed to register',
           route: '/register'
        })
   }
}

export async function LoginUser(req: Request, res: Response, next: NextFunction) {
    try {
        const validationResult = loginSchema.validate(req.body,options)
        if (validationResult.error) {
            return res.status(400).json({
                Error:validationResult.error.details[0].message
            })
        }
        const User = await UserInstance.findOne({where:{email:req.body.email}})as unknown as {[key:string]:string}
        console.log(User)
        
        const {id} = User
        const token = generateToken({ id })
        console.log(token);
        
        const validUser = await bcrypt.compare(req.body.password, User.password);

        if (!validUser) {
            res.status(401).json({
                msg:"Password do not match"
            })
        }

        if (validUser) {
            res.redirect('/movies/read')
            // res.status(200).json({
            //     msg: "Login Successful",
            //     token,
            //     User
            // })
        }
    } catch (error) {
        
        
        console.log(error)
        res.status(500).json({
            msg: 'login failed',
            route: '/login'
            
        })
    }
}

export async function getUsers(
    req: Request,
    res: Response,
    next: NextFunction
){
    try {
        const limit = req.query?.limit as number | undefined;
        const offset = req.query?.offset as number | undefined;
        const record = await UserInstance.findAndCountAll({
            limit, offset,
            include: [{
                model: MovieInstance,
                as: 'movie'
            }]
        });

        res.status(200).json({
            msg: "You have successfully fetched all movies",
            count: record.count,
            record: record.rows,
        });
        
    } catch (error) {
        res.status(500).json({
            msg: "failed to read",
            route: "/read",
        });
    }
}