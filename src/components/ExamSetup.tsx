import React, { useState } from 'react';

interface ExamSetupProps {
  totalQuestions: number;
  onStartExam: (startQuestion: number, endQuestion: number) => void;
}

const ExamSetup: React.FC<ExamSetupProps> = ({ totalQuestions, onStartExam }) => {
  const [startQuestion, setStartQuestion] = useState<number>(1);
  const [endQuestion, setEndQuestion] = useState<number>(totalQuestions);
  const [startInput, setStartInput] = useState<string>('1');
  const [endInput, setEndInput] = useState<string>(totalQuestions.toString());

  const handleStartChange = (value: string) => {
    setStartInput(value);
  };

  const handleStartBlur = () => {
    const numValue = parseInt(startInput) || 1;
    const validValue = Math.max(1, Math.min(numValue, endQuestion));
    setStartQuestion(validValue);
    setStartInput(validValue.toString());
  };

  const handleEndChange = (value: string) => {
    setEndInput(value);
  };

  const handleEndBlur = () => {
    const numValue = parseInt(endInput) || totalQuestions;
    const validValue = Math.max(startQuestion, Math.min(numValue, totalQuestions));
    setEndQuestion(validValue);
    setEndInput(validValue.toString());
  };

  const handleStartExam = () => {
    onStartExam(startQuestion, endQuestion);
  };

  const intervalSize = endQuestion - startQuestion + 1;
  const questionsToSelect = Math.min(intervalSize, 50);

  const isValidInterval = startQuestion <= endQuestion && startQuestion >= 1 && endQuestion <= totalQuestions;
console.log(totalQuestions, "jsjsj")
  return (
    <div className="setup-container">
      <div className="setup-card fade-in">
        <h1 className="setup-title">🧠 Exam Setup</h1>
        <p className="setup-subtitle">
          Select the question range for your exam. You can choose from 1 to {totalQuestions} questions.
        </p>

        <div className="setup-info">
          <strong>📊 Exam Information:</strong><br />
          • Total available questions: {totalQuestions}<br />
          • Questions in selected interval: {intervalSize}<br />
          • Questions that will be selected: {questionsToSelect}<br />
          {intervalSize > 50 && "• 50 questions will be randomly selected from your interval"}
          {intervalSize <= 50 && intervalSize < 50 && "• All questions from your interval will be used"}
        </div>

        <div className="interval-inputs">
          <div className="input-range">
            <div className="input-group" style={{ flex: 1 }}>
              <label className="input-label" htmlFor="start-question">
                Start Question
              </label>
              <input
                id="start-question"
                type="number"
                min="1"
                max={totalQuestions}
                value={startInput}
                onChange={(e) => handleStartChange(e.target.value)}
                onBlur={handleStartBlur}
                className="number-input"
                placeholder="1"
              />
            </div>
            
            <span className="range-separator">to</span>
            
            <div className="input-group" style={{ flex: 1 }}>
              <label className="input-label" htmlFor="end-question">
                End Question
              </label>
              <input
                id="end-question"
                type="number"
                min="1"
                max={totalQuestions}
                value={endInput}
                onChange={(e) => handleEndChange(e.target.value)}
                onBlur={handleEndBlur}
                className="number-input"
                placeholder={totalQuestions.toString()}
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleStartExam}
          disabled={!isValidInterval}
          className="start-exam-button"
        >
          Start Exam ({questionsToSelect} Questions)
        </button>
      </div>
    </div>
  );
};

export default ExamSetup;