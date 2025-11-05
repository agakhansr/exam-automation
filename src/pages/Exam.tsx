import React, { useState, useEffect } from 'react';
import { Question, ExamState } from '../types/Question';
import QuestionCard from '../components/QuestionCard';
import ExamSetup from '../components/ExamSetup';
import questionsData from '../data/questions.json';

const Exam: React.FC = () => {
  const [examState, setExamState] = useState<ExamState>({
    currentQuestionIndex: 0,
    selectedAnswer: null,
    showResult: false,
    score: 0,
    questions: [],
    isExamCompleted: false,
    isSetupCompleted: false
  });

  const [isLoading, setIsLoading] = useState(true);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);

  useEffect(() => {
    // Load total questions count
    const loadQuestionsInfo = () => {
      const allQuestions: Question[] = questionsData;
      setTotalQuestions(allQuestions.length);
      setIsLoading(false);
    };

    loadQuestionsInfo();
  }, []);

  const handleStartExam = (startQuestion: number, endQuestion: number) => {
    const allQuestions: Question[] = questionsData;
    
    // Filter questions by the selected interval (using id field)
    const intervalQuestions = allQuestions.filter(
      q => q.id >= startQuestion && q.id <= endQuestion
    );
    
    // Shuffle the interval questions
    const shuffled = [...intervalQuestions].sort(() => Math.random() - 0.5);
    
    // Select up to 50 questions, or all if less than 50
    const selectedQuestions = shuffled.slice(0, Math.min(50, shuffled.length));
    
    setExamState(prev => ({
      ...prev,
      questions: selectedQuestions,
      isSetupCompleted: true
    }));
  };

  const handleAnswerSelect = (answer: string) => {
    setExamState(prev => ({
      ...prev,
      selectedAnswer: answer,
      showResult: true,
      score: answer === prev.questions[prev.currentQuestionIndex].answer 
        ? prev.score + 1 
        : prev.score
    }));
  };

  const handleNext = () => {
    if (examState.currentQuestionIndex + 1 >= examState.questions.length) {
      setExamState(prev => ({
        ...prev,
        isExamCompleted: true
      }));
    } else {
      setExamState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        selectedAnswer: null,
        showResult: false
      }));
    }
  };

  const resetExam = () => {
    setExamState({
      currentQuestionIndex: 0,
      selectedAnswer: null,
      showResult: false,
      score: 0,
      questions: [],
      isExamCompleted: false,
      isSetupCompleted: false
    });
  };

  const retakeWithSameQuestions = () => {
    setExamState(prev => ({
      ...prev,
      currentQuestionIndex: 0,
      selectedAnswer: null,
      showResult: false,
      score: 0,
      isExamCompleted: false
    }));
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading exam questions...</p>
          <div className="loading-dots">
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show setup screen if exam hasn't been configured yet
  if (!examState.isSetupCompleted) {
    return (
      <ExamSetup 
        totalQuestions={totalQuestions}
        onStartExam={handleStartExam}
      />
    );
  }

  if (examState.isExamCompleted) {
    const percentage = Math.round((examState.score / examState.questions.length) * 100);
    
    return (
      <div className="completion-container">
        <div className="completion-card fade-in">
          <div className="completion-emoji">
            {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '📚'}
          </div>
          <h2 className="completion-title">Exam Completed!</h2>
          <p className="completion-subtitle">Here are your results:</p>
          
          <div className="score-display">
            <div className="score-number">
              {examState.score} / {examState.questions.length}
            </div>
            <div className="score-percentage">
              Score: {percentage}%
            </div>
            <div className={`score-grade ${
              percentage >= 80 ? 'grade-excellent' : 
              percentage >= 60 ? 'grade-good' : 'grade-practice'
            }`}>
              {percentage >= 80 ? 'Excellent!' : 
               percentage >= 60 ? 'Good Job!' : 'Keep Practicing!'}
            </div>
          </div>
          
          <div className="completion-buttons">
            <button
              onClick={retakeWithSameQuestions}
              className="retry-button"
            >
              Retake Same Questions
            </button>
            <button
              onClick={resetExam}
              className="back-to-setup-button"
            >
              Configure New Exam
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (examState.questions.length === 0) {
    return (
      <div className="error-container">
        <div className="error-content">
          <p className="error-text">No questions available. Please add questions to the questions.json file.</p>
        </div>
      </div>
    );
  }

  const currentQuestion = examState.questions[examState.currentQuestionIndex];

  return (
    <div className="exam-container">
      <div className="exam-content">
        <div className="exam-header fade-in">
          <h1 className="exam-title">🧠 Exam Automation Tool</h1>
          <p className="exam-subtitle">Answer the questions to test your knowledge</p>
          <div className="exam-score-badge">
            Current Score: {examState.score} / {examState.currentQuestionIndex + (examState.showResult ? 1 : 0)}
          </div>
        </div>

        <QuestionCard
          question={currentQuestion}
          selectedAnswer={examState.selectedAnswer}
          showResult={examState.showResult}
          onAnswerSelect={handleAnswerSelect}
          onNext={handleNext}
          currentQuestionNumber={examState.currentQuestionIndex + 1}
          totalQuestions={examState.questions.length}
        />
      </div>
    </div>
  );
};

export default Exam;