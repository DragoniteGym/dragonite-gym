const pool = require('../../db_models/pool');

const getWorkouts = async (req, res) => {
    const { bodypart, user } = req.body;

    try {
        //const result = await pool.query('SELECT * FROM users', []);
        console.log('Category:', bodypart);
        console.log('User:', user);
        res.status(200).json([
            {
                bodyPart: `${bodypart}`,
                equipment: 'string',
                gifUrl: 'string',
                id: 'string',
                name: 'string',
                target: 'string',
                secondaryMuscles: ['string'],
                instructions: ['string', 'string', 'string'],
            },
            {
                bodyPart: `${bodypart}`,
                equipment: 'string',
                gifUrl: 'string',
                id: 'string',
                name: 'string',
                target: 'string',
                secondaryMuscles: ['string', 'string'],
                instructions: ['string', 'string'],
            },
        ]);
    } catch (err) {
        console.log('Error in getWorkouts:', err);
        res.status(500).json({ message: 'Error getting saved workouts' });
    }
};

module.exports = {
    getWorkouts,
};