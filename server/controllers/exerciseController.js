const pool = require('../../db_models/pool');
const fetch = require('node-fetch');

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
            const result = await response.json(); 
    
            console.log(result);  // logging fetched data
    
            res.locals.exercises = result;
            return res.status(200).json(res.locals.exercises); // send response back to the client
    
        } catch (err) {
            return next({
                log: 'Error in getExerciseList middleware',
                status: 500,
                message: { err: 'Error fetching exercises by body part' },
            });
        }
    },

    // middleware for searching exercises by name
    getExerciseByName: async (req, res, next) => {
        const { name } = req.body; // expecting exercise name in the request body
    
        try {
            const url = `https://exercisedb.p.rapidapi.com/exercises/name/${name}`;
            const response = await fetch(url, options);
            const result = await response.json(); 
    
            console.log(result);
    
            // Check if any exercise was found
            if (result.length === 0) {
                return res.status(404).json({ message: 'No exercises found with that name' });
            }
    
            // Send the result to the client
            return res.status(200).json(result);
    
        } catch (err) {
            return next({
                log: 'Error in getExerciseByName middleware',
                status: 500,
                message: { err: 'Error fetching exercise by name' },
            });
        }
    }
};

module.exports = exerciseController;