export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

export interface ExamState {
  currentQuestionIndex: number;
  selectedAnswer: string | null;
  showResult: boolean;
  score: number;
  questions: Question[];
  isExamCompleted: boolean;
}