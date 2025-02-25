const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const questionRoutes = require('./routes/questionRoutes');

dotenv.config();

const app = express();

// Configure CORS to allow requests from your frontend
app.use(cors({
    origin: 'https://quiz-game-application-frontend.vercel.app', 
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
}));

app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => {
    console.error('MongoDB Connection Failed:', err);
    process.exit(1);
});

// Routes
app.use('/api/questions', questionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
