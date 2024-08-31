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
        
    }
};

