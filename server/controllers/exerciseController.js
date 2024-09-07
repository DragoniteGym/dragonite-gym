const pool = require('../../db_models/pool');
import fetch from 'node-fetch';

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
        const { bodypart } = req.body;
    
        try {
            const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodypart}?limit=10&offset=0`;
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

    saveExercise: async (req, res, next) => {
        const { id } = req.body; // assuming id will be sent over on params
        const { user_id } = req.body; //assuming userID can come from body

        if (!id) return res.status(400).json({ message: 'Invalid ID '});

        try {
            // create query to insert into database
            const saveIdQuery = `INSERT INTO exercises (query_id)
            VALUES ($1) RETUNING *;`
            const values = [id];
            // save to database
            const result = await pool.query(saveIdQuery, values);

            // if result has no rowcount, return no content found error
            if (result.rowCount !== 1) {
                return res.status(201).json({ message: 'No exercises saved to database' });
            }

            // get userID from result
            const exerciseId = result.rows[0].exercise_id;

            // add userID and exerciseID to join table to associate them
            const saveJoinQuery = `INSERT INTO user_exercises (user_id, exercise_id)
            VALUES ($1, $2)`;
            const joinValues = [user_id, exerciseId];
            await pool.query(saveJoinQuery, joinValues);

            // return successful message
            return res.status(201).json({ message: 'Excersie saved and linked to user successfully' });

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

    getSavedExercise: async (req, res, next) => {
        const { user_id } = req.body

        try {
        // query to get userid from join table
        const getIdQuery = `SELECT e.query_id 
        FROM exercises e 
        INNER JOIN userexercises ue ON e.exercise_id = ue.exercise_id
        WHERE ue.user_id = $1`
        const values = [user_id];
        const result = await pool.query(getIdQuery, values);
        
        // check if result is returned
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'No exercises found for this user' });
        }

        // map over results and make urls array to give into fetchpromises
        const urls = result.rows.map((row) => `https://exercisedb.p.rapidapi.com/exercise/${row.query_id}`);
        // map over urls and put and fetch each url with the options
        const fetchPromises = urls.map((url) => fetch(url, options).then(response => response.json()));

        // create array with all the completed promises
        const resultArr = await Promise.all(fetchPromises);

        // return array to front end
        return res.status(200).json(resultArr)


        } catch (err) {
            return next({
                log: 'Error in getSavedExercise middleware',
                status: 500,
                message: { err: 'Error retrieving exercises from db' },
            })
        }
    }

};

module.exports = exerciseController;