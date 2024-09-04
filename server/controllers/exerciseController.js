const pool = require('../../db_models/pool');
const fetch = require('node-fetch')

const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'b1cd7ee699msha2f86e38df7acedp1ec17ejsn16b653bc2ebf',
		'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
    }
};

const exerciseController = {
    getExerciseList: async (req, res, next) => {
     const { bodyPart } = req.body;

     try {
        const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}?limit=10&offset=0`;

        const response = await fetch(url, options);
        const result = await response.text();
        console.log('result');
        res.locals.exercises = result;
        return next();

     } catch (err) {
        return next({
            log: 'Error in get exercise middlware',
            status: 500,
            message: err.message,
        })
     }
    }
};

