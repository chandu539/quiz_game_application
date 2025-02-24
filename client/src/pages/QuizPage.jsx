import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../styles/Quiz.css';

function QuizPage() {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);

    const predefinedQuestions = [
        { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], correctAnswer: "Paris" },
        { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correctAnswer: "4" },
        { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], correctAnswer: "Mars" },
        { question: "Who wrote 'Hamlet'?", options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"], correctAnswer: "William Shakespeare" },
        { question: "What is the largest ocean on Earth?", options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"], correctAnswer: "Pacific Ocean" },
        { question: "Which gas do plants absorb from the atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correctAnswer: "Carbon Dioxide" },
        { question: "Who invented the light bulb?", options: ["Nikola Tesla", "Thomas Edison", "Alexander Graham Bell", "Marie Curie"], correctAnswer: "Thomas Edison" },
        { question: "What is the square root of 64?", options: ["6", "7", "8", "9"], correctAnswer: "8" },
        { question: "Which country is famous for the Great Wall?", options: ["India", "China", "Japan", "Russia"], correctAnswer: "China" },
        { question: "How many continents are there on Earth?", options: ["5", "6", "7", "8"], correctAnswer: "7" }
    ];

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('https://quiz-game-application-backend.vercel.app/api/questions');
                if (response.data.length === 0) {
                    await axios.post('https://quiz-game-application-backend.vercel.app/api/questions/store', { questions: predefinedQuestions });
                    toast.success("Questions stored successfully!");
                    const updatedResponse = await axios.get('https://quiz-game-application-backend.vercel.app/api/questions');
                    setQuestions(updatedResponse.data);
                } else {
                    setQuestions(response.data);
                }
            } catch (error) {
                console.error("Error storing/fetching questions:", error);
                toast.error("Failed to store or fetch questions!");
            }
        };

        fetchQuestions();
    }, []);

    const handleAnswer = (answer) => {
        if (answer === questions[currentQuestion]?.correctAnswer) {
            setScore(prevScore => prevScore + 1);
            toast.success('Correct Answer!');
        } else {
            toast.error('Wrong Answer!');
        }

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            setTimeout(() => {
                navigate('/result', { state: { finalScore: score + (answer === questions[currentQuestion]?.correctAnswer ? 1 : 0) } });
            }, 1000);
        }
    };

    return (
        <div className="quiz-container">
            <h1>Quiz Page</h1>
            {questions.length > 0 ? (
                <>
                    <h2>{questions[currentQuestion]?.question}</h2>
                    <div className="options">
                        {questions[currentQuestion]?.options.map((option, index) => (
                        <button key={index} data-index={index + 1} onClick={() => handleAnswer(option)}>
                            {option}
                        </button>
                        ))}
                    </div>
                    <div className="navigation-buttons">
                        {currentQuestion > 0 && (
                            <button onClick={() => setCurrentQuestion(currentQuestion - 1)}>Previous</button>
                        )}
                        {currentQuestion < questions.length - 1 ? (
                            <button onClick={() => setCurrentQuestion(currentQuestion + 1)}>Next</button>
                        ) : (
                            <button onClick={() => navigate('/result', { state: { finalScore: score } })}>
                                Submit
                            </button>
                        )}
                    </div>
                </>
            ) : (
                <p>Loading questions...</p>
            )}
        </div>
    );
}
export default QuizPage;
