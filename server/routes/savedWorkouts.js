const express = require('express');
const router = express.Router();
const { getWorkouts } = require('../controllers/savedWorkoutsController');

//route to get saved workouts
router.post('/getWorkouts', getWorkouts);

module.exports = router;