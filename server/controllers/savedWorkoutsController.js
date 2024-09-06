const pool = require('../../db_models/pool');

const getWorkouts = async (req, res) => {
    const { bodypart, user } = req.body;

    try {
        //const result = await pool.query('SELECT * FROM users', []);
        console.log('Category:', bodypart);
        console.log('User:', user);
        res.status(200).json([
            {
                title: 'Exercise #Yay',
                text: '',
                link: '/search',
                width: '30%',
            },
            {
                title: 'Exercise #It Worked!',
                text: '',
                link: '/search',
                width: '30%',
            },
            {
                title: `Exercise # ${bodypart}`,
                text: '',
                link: '/search',
                width: '30%',
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