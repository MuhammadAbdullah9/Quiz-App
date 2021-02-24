import React, { useState } from 'react';
import { Difficulty, fetchQuestions, QuestionState } from './components/API';
import Questions from './components/Questions';
import { GlobalStyle, Wrapper } from './App.styles';

const TotalQuestions = 10

type AnswerObject = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}


function App() {

  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [score, setScore] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [gameOver, setGameOver] = useState(true)

  const startQuiz = async () => {
    setLoading(true)
    setGameOver(false)
    const newQuestions = await fetchQuestions(TotalQuestions, Difficulty.MEDIUM)
    setQuestions(newQuestions)
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoading(false)
  };
  const nextQuestion = () => {
    const nextQuestion = number + 1
    if (nextQuestion === TotalQuestions) {
      setGameOver(true)
    }
    else {
      setNumber(nextQuestion)
    }
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value

      const correct = questions[number].correct_answer === answer

      if (correct) setScore(prev => prev + 1)

      const answerObj = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswers(prev => [...prev, answerObj])

    }
  };

  return (
    <div>
      <GlobalStyle />
      <Wrapper>
        <h1>Maths Quiz</h1>
        {gameOver || userAnswers.length === TotalQuestions ? (
          <button className="start" onClick={startQuiz}>Start Quiz</button>
        ) : null}
        {!gameOver ? (
          <p className="score">Score: {score}</p>
        ) : null}
        {loading ? (
          <p>loading... Please Wait</p>
        ) : null}
        {!loading && !gameOver ? (
          <Questions

            questionNo={number + 1}
            totalQuestions={TotalQuestions}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}

          />
        ) : null}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TotalQuestions - 1 ? (
          <button className="next" onClick={nextQuestion}>Next</button>
        ) : null}
      </Wrapper>
    </div>
  );
}

export default App;
