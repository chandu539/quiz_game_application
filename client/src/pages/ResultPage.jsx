import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Result.css";

function ResultPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const finalScore = location.state?.finalScore || 0;
    const totalQuestions = location.state?.totalQuestions || 10; 
    const percentage = ((finalScore / totalQuestions) * 100).toFixed(2);

    
    const getPerformanceMessage = () => {
        if (percentage === 100) return "🏆 Perfect Score! Amazing job!";
        if (percentage >= 80) return "🎉 Great Job! You're a quiz master!";
        if (percentage >= 50) return "🙂 Good effort! Keep practicing.";
        return "😟 Don't worry! Try again and improve.";
    };

    return (
        <div className="result-container">
            <h1>🎯 Quiz Completed!</h1>
            <div className="score-details">
                <h2>Your Score: <span>{finalScore}</span> / {totalQuestions}</h2>
                <h3>Percentage: <span>{percentage}%</span></h3>
                <p className="performance-message">{getPerformanceMessage()}</p>
            </div>
            <div className="result-buttons">
                <button onClick={() => navigate('/quiz')}>🔄 Play Again</button>
                <button onClick={() => navigate('/')}>🏠 Go Home</button>
            </div>
        </div>
    );
}

export default ResultPage;
