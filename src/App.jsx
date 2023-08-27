import React, { useState, useEffect } from 'react';
import './App.css';

const questions = [
  {
    question: 'Pertanyaan 1?',
    answers: ['Jawaban 1', 'Jawaban 2', 'Jawaban 3', 'Jawaban 4'],
    correct: 0,
  },
  {
    question: 'Pertanyaan 2?',
    answers: ['Jawaban 1', 'Jawaban 2', 'Jawaban 3', 'Jawaban 4'],
    correct: 0,
  },
  {
    question: 'Pertanyaan 3?',
    answers: ['Jawaban 1', 'Jawaban 2', 'Jawaban 3', 'Jawaban 4'],
    correct: 0,
  },
  {
    question: 'Pertanyaan 4?',
    answers: ['Jawaban 1', 'Jawaban 2', 'Jawaban 3', 'Jawaban 4'],
    correct: 0,
  },
  {
    question: 'Pertanyaan 5?',
    answers: ['Jawaban 1', 'Jawaban 2', 'Jawaban 3', 'Jawaban 4'],
    correct: 0,
  },
  {
    question: 'Pertanyaan 6?',
    answers: ['Jawaban 1', 'Jawaban 2', 'Jawaban 3', 'Jawaban 4'],
    correct: 0,
  },
  {
    question: 'Pertanyaan 7?',
    answers: ['Jawaban 1', 'Jawaban 2', 'Jawaban 3', 'Jawaban 4'],
    correct: 0,
  },
  {
    question: 'Pertanyaan 8?',
    answers: ['Jawaban 1', 'Jawaban 2', 'Jawaban 3', 'Jawaban 4'],
    correct: 0,
  },
  // ... Isi pertanyaan lainnya
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(210); // 3 menit 30 detik
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    if (timerRunning) {
      if (timeLeft === 0) {
        finishQuiz();
      } else {
        const timerInterval = setInterval(() => {
          setTimeLeft(prevTime => prevTime - 1);
        }, 1000);
  
        return () => clearInterval(timerInterval);
      }
    }
  }, [timeLeft, timerRunning]);

  const startQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResults(false);
    setScore(0);
    setTimeLeft(210);
    setTimerRunning(true);
  };

  const finishQuiz = () => {
    setTimerRunning(false);
    setShowResults(true);
  };

  const handleAnswerClick = (index) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(index);
      if (index === questions[currentQuestion].correct) {
        setScore(prevScore => prevScore + 1);
      }
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prevQuestion => prevQuestion + 1);
    }
  };

  const prevQuestion = () => {
    setSelectedAnswer(null);
    if (currentQuestion > 0) {
      setCurrentQuestion(prevQuestion => prevQuestion - 1);
    }
  };

  return (
    <div className="App">
      <div className="quiz-container">
        {timerRunning ? (
          <div className="timer">
            <p>{`${String(Math.floor(timeLeft / 60)).padStart(2, '0')}:${String(
              timeLeft % 60
            ).padStart(2, '0')}`}</p>
          </div>
        ) : (
          <div className="start-button">
            <button onClick={startQuiz}>Mulai Kuis</button>
          </div>
        )}

        {showResults ? (
          <div className="results">
            <h2>Hasil Kuis</h2>
            <p>Skor Anda: {score}</p>
            <button onClick={startQuiz}>Coba Lagi</button>
          </div>
        ) : (
          <div>
            <div className="question">
              <p>{questions[currentQuestion].question}</p>
            </div>
            <div className="answers">
              {questions[currentQuestion].answers.map((answer, index) => (
                <button
                  key={index}
                  className={`answer ${selectedAnswer === index && 'selected'}`}
                  onClick={() => handleAnswerClick(index)}
                  disabled={selectedAnswer !== null}
                >
                  {answer}
                </button>
              ))}
            </div>
            <div className="pagination">
              <button className="px-3" onClick={prevQuestion} disabled={currentQuestion === 0}>Sebelumnya</button>

              <button className="px-3" onClick={nextQuestion} disabled={currentQuestion === questions.length - 1}>Selanjutnya</button>

              {currentQuestion === questions.length - 1 && (
                <button className="px-3" onClick={finishQuiz}>Kumpulkan</button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
