const express = require('express');
const Question = require('../models/Question');
const router = express.Router();

router.post('/store', async (req, res) => {
    try {
        const existingQuestions = await Question.find();
        if (existingQuestions.length === 0) {
            await Question.insertMany(req.body.questions);
            return res.status(201).json({ message: 'Questions stored successfully' });
        }
        res.status(200).json({ message: 'Questions already exist' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to store questions', details: error });
    }
});


router.get('/', async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch questions', details: error });
    }
});

module.exports = router;
