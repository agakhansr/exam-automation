import React from 'react';
import { Question } from '../types/Question';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: string | null;
  showResult: boolean;
  onAnswerSelect: (answer: string) => void;
  onNext: () => void;
  currentQuestionNumber: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  showResult,
  onAnswerSelect,
  onNext,
  currentQuestionNumber,
  totalQuestions
}) => {
  const getOptionStyle = (option: string) => {
    if (!showResult) {
      return selectedAnswer === option 
        ? 'option-button selected' 
        : 'option-button';
    }

    if (option === question.answer) {
      return 'option-button correct disabled';
    }
    
    if (selectedAnswer === option && option !== question.answer) {
      return 'option-button incorrect disabled';
    }
    
    return 'option-button disabled';
  };

  return (
    <div className="question-card fade-in">
      <div className="question-header">
        <h2 className="question-number">
          Question {currentQuestionNumber} of {totalQuestions}
        </h2>
        <div className="progress-badge">
          {currentQuestionNumber}/{totalQuestions}
        </div>
      </div>
      <p className="question-text">{question.question}</p>

      <div className="options-container">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !showResult && onAnswerSelect(option)}
            disabled={showResult}
            className={getOptionStyle(option)}
          >
            <span className="option-label">{String.fromCharCode(65 + index)}.</span> {option}
          </button>
        ))}
      </div>

      {showResult && (
        <div className={`result-section ${selectedAnswer === question.answer ? 'result-correct' : 'result-incorrect'}`}>
          {selectedAnswer === question.answer ? (
            <div>
              <span className="result-icon">✅</span>
              <span className="result-text">Correct!</span>
            </div>
          ) : (
            <div>
              <div>
                <span className="result-icon">❌</span>
                <span className="result-text">Incorrect!</span>
              </div>
              <p className="correct-answer">
                The correct answer is: <strong>
                    {String.fromCharCode(65 + question.options.indexOf(question.answer))}
                    {" "}
                    {question.answer}</strong>
              </p>
            </div>
          )}
        </div>
      )}

      {showResult && (
        <button
          onClick={onNext}
          className="next-button"
        >
          {currentQuestionNumber === totalQuestions ? 'Finish Exam' : 'Next Question'}
        </button>
      )}
    </div>
  );
};

export default QuestionCard;