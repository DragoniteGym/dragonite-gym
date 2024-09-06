const express = require('express');
const router = express.Router();

const {  getExerciseByName, getExerciseList  } = require('../controllers/exerciseController');

//route to get list of exercises that match the body part
router.post('/getExercise', getExerciseList);

//route to get exercise by name
router.post('/searchExercise', getExerciseByName);

module.exports = router;