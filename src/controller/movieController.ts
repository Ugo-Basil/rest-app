import { Request, Response, NextFunction } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { MovieInstance } from '../model/movie'
import { createMovieSchema,options,updateMovieSchema } from '../utils/utils'

export async function Movies(req: Request | any, res: Response, next: NextFunction) {
    const id = uuidv4()
    try {
        const verified = req.user
        const validationResult = createMovieSchema.validate(req.body, options)
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message
            })
        }
        const record = await MovieInstance.create({ id, ...req.body, userId: verified.id })
        res.status(201).json({
            msg:"You have added a movie",
            record
        })
        
    
   } catch (error) {
       res.status(500).json({
        msg: 'failed to create',
        route: '/create'
    })
   }
  
}

export async function getMovies(req: Request, res: Response, next: NextFunction) {
    try {
        const limit = req.query?.limit as number | undefined
        const offset = req.query?.offset as number | undefined
        const record = await MovieInstance.findAll({ limit, offset })
        res.render('index', {record})
        // res.status(200).json({
        //     msg: "You have successfully fetched all movies",
        //     count: record,
        //     record: record
        // })
    } catch (error) {
        res.status(500).json({
            msg: "failed to read",
            route:"/read"
        })
    }
}

export async function getSingleMovie(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params
        const record = await MovieInstance.findOne({ where: { id } })
        return res.status(200).json({
            msg: "Successfully gotten user information",
            record
        })
        
    } catch (error) {
        res.status(500).json({
            msg:"failed to fetch single movie",
            route:"/read/:id"
        })
    }
}

export async function updateMovies(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params
        const {title, description,imageurl, price} = req.body
        const validationResult = updateMovieSchema.validate(req.body,options)
        if (validationResult.error) {
            res.status(400).json({
                Error:validationResult.error.details[0].message
            })
        }

        const record = await MovieInstance.findOne({ where: { id } })
        if (!record) {
            return res.status(404).json({
                Error:"Cannot find existing movie"
            })
        }
        const updatedrecord = await record.update({
            title: title,
            description: description,
            imageurl: imageurl,
            price: price
        })
        res.status(200).json({
            msg: "You have succesfully updated your movie",
            updatedrecord
        })
    } catch (error) {
        res.status(500).json({
            msg: 'failed to update movie',
            route:"/update/:id"
        })
    }
}

export async function deleteMovies(req: Request, res: Response, next: NextFunction) {
    try {
        const {id} = req.params
        const record = await MovieInstance.findOne({ where: { id } })
        if (!record) {
            return res.status(404).json({
                msg:"Cannot find movie"
            })
        }
        const deletedRecord = await record.destroy()
        return res.status(200).json({
            msg: "Movie deleted successfully",
            deletedRecord
        })
        
    } catch (error) {
        res.status(500).json({
            msg: "failed to delete movie",
            route:"/delete/:id"
        })
    }
}