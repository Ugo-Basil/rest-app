"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovies = exports.updateMovies = exports.getSingleMovie = exports.getMovies = exports.Movies = void 0;
const uuid_1 = require("uuid");
const movie_1 = require("../model/movie");
const utils_1 = require("../utils/utils");
async function Movies(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        const verified = req.user;
        const validationResult = utils_1.createMovieSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message
            });
        }
        const record = await movie_1.MovieInstance.create({ id, ...req.body, userId: verified.id });
        res.status(201).json({
            msg: "You have added a movie",
            record
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'failed to create',
            route: '/create'
        });
    }
}
exports.Movies = Movies;
async function getMovies(req, res, next) {
    try {
        const limit = req.query?.limit;
        const offset = req.query?.offset;
        const record = await movie_1.MovieInstance.findAll({ limit, offset });
        res.render('index', { record });
        // res.status(200).json({
        //     msg: "You have successfully fetched all movies",
        //     count: record,
        //     record: record
        // })
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to read",
            route: "/read"
        });
    }
}
exports.getMovies = getMovies;
async function getSingleMovie(req, res, next) {
    try {
        const { id } = req.params;
        const record = await movie_1.MovieInstance.findOne({ where: { id } });
        return res.status(200).json({
            msg: "Successfully gotten user information",
            record
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to fetch single movie",
            route: "/read/:id"
        });
    }
}
exports.getSingleMovie = getSingleMovie;
async function updateMovies(req, res, next) {
    try {
        const { id } = req.params;
        const { title, description, imageurl, price } = req.body;
        const validationResult = utils_1.updateMovieSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            res.status(400).json({
                Error: validationResult.error.details[0].message
            });
        }
        const record = await movie_1.MovieInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(404).json({
                Error: "Cannot find existing movie"
            });
        }
        const updatedrecord = await record.update({
            title: title,
            description: description,
            imageurl: imageurl,
            price: price
        });
        res.status(200).json({
            msg: "You have succesfully updated your movie",
            updatedrecord
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'failed to update movie',
            route: "/update/:id"
        });
    }
}
exports.updateMovies = updateMovies;
async function deleteMovies(req, res, next) {
    try {
        const { id } = req.params;
        const record = await movie_1.MovieInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(404).json({
                msg: "Cannot find movie"
            });
        }
        const deletedRecord = await record.destroy();
        return res.status(200).json({
            msg: "Movie deleted successfully",
            deletedRecord
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to delete movie",
            route: "/delete/:id"
        });
    }
}
exports.deleteMovies = deleteMovies;
