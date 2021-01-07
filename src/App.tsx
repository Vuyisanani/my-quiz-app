import React, {useState} from 'react';
import QuestionCard  from './components/QuestionCard';
import { fetchQuizQuestions, Difficulty, QuestionState }from './components/Api';

const App = () => {

  const TOTAL_QUESTIONS = 10;
  const title = `My Quiz App`;

  type AnswerObject = {
    question: string;
    answer: string;
    correct: boolean;
    correctAnswer: string;
  }
  
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number,setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }

  const checkAswer = (e: React.MouseEvent<HTMLButtonElement>) => {

  }

  const nextQuestion = () => {

  }
  //For loading Questions, will later implement a spinner
  return (
    <div className="App">
      <h1>{title}</h1>
      { gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startTrivia}>
        Start
      </button>
      ):
        null 
      }
      
      {!gameOver ? <p className="score"> Score: </p> : null }
      { loading && <p>Loading Questios..</p> }
      {!loading && !gameOver && (
        <QuestionCard 
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAswer}
        />
      )}

      <button className="next" onClick={nextQuestion}>Next Question</button>

    </div>
  );
}

export default App;
