const pool = require('../../db_models/pool');

const getWorkouts = async (req, res) => {
    const { bodypart, user } = req.body;

    // Get exercise idsfrom DB for user
    const getIdQuery = 'SELECT e.query_id FROM exercises e INNER JOIN userexercises ON e.exercises_id = ue.exercise_id WHERE ue.user_id = $1';

    try {
        //const result = await pool.query(getIdQuery, [user]);
        //console.log(result);
        console.log('Category:', bodypart);
        console.log('User:', user);
        res.status(200).json([
            {
                bodyPart: `upper legs`,
                equipment: 'band',
                gifUrl: 'https://v2.exercisedb.io/image/uCV8-KFA9ta5uI',
                id: '0987',
                name: 'band one arm single leg split squat',
                target: 'quads',
                secondaryMuscles: ['glutes', 'hamstrings'],
                instructions: ['Stand with your feet hip-width apart and place a resistance band around your ankles.', 
                    'Extend one leg forward and rest the top of your foot on a bench or step behind you.', 
                    'Hold onto a support with one hand for balance.', 
                    'Bend your standing leg and lower your body down into a squat position, keeping your knee in line with your toes.', 
                    'Push through your heel to return to the starting position.', 
                    'Repeat for the desired number of repetitions, then switch legs.',
                ],
            },
            {
                bodyPart: `upper legs`,
                equipment: 'band',
                gifUrl: 'https://v2.exercisedb.io/image/GMRVc9Twz6G80C',
                id: '1001',
                name: 'band single leg split squat',
                target: 'quads',
                secondaryMuscles: ['glutes', 'hamstrings'],
                instructions: ['Stand with your feet hip-width apart and place a resistance band around your ankles.', 
                    'Take a big step forward with your right foot and a smaller step back with your left foot.', 
                    'Bend your knees and lower your body until your right thigh is parallel to the ground, keeping your left knee slightly above the ground.', 
                    'Push through your right heel to return to the starting position.', 
                    'Repeat on the other side.',
                ],
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