const pool = require('../../db_models/pool');
//const fetch = require('node-fetch');

const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'b1cd7ee699msha2f86e38df7acedp1ec17ejsn16b653bc2ebf',
		'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
    }
};

const exerciseController = {
    // middleware for fetching list of exercises by bodypart
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
    },

    //create middleware that saves exercise to the database
    //user will click button on front end to save
    //frontend button will send exercise id to backend
    //save exercise id to database

    saveExercise: async (req, res, next) => {
        const { id } = req.params; // assuming id will be sent over on params

        try {
            // create query to insert into database
            const saveIdQuery = `INSERT INTO exercises (query_id)
                                VALUES (${ id });`
            // save to database
            const result = await pool.query(saveIdQuery);

            // if result has no rowcount, return no content found error
            if (result.rowCount !== 1) {
                return res.status(204).json({ message: 'No exercises saved to database' });
            }

            return next();

        } catch (err) {
            return next({
                log: 'Error in saveExercise middleware',
                status: 500,
                message: { err: 'Error saving exercise to db' },
            });
        }


    },

    //create middleware that will serve all execises when user checks their saved ones
    //when user goes to that page, it will serve all the saved ones
    //pull all the ids from database
    //make request for each id
    //push each object to an array
    //serve array to frontend

};

module.exports = exerciseController;