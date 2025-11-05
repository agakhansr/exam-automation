# 🧠 Exam Automation Tool

An interactive exam automation system built with **React** and **TypeScript**.  
It allows users to take randomized exams from a question bank (JSON file), get instant feedback for each answer, and track their score throughout the session.

---

## 🚀 Features

- 🎲 **Randomized Questions:** Randomly selects 50 questions out of 500+ from a JSON dataset.
- ✅ **Instant Feedback:** After each answer, it immediately shows whether your selection was correct or wrong.
- 🔍 **Highlight True Answer:** If you answer incorrectly, the correct answer is highlighted automatically.
- ⏭ **Navigation System:** “Next” button to move to the next question.
- 🧾 **Score Tracking:** Displays the total number of correct answers at the end.
- 🧩 **JSON Data Source:** Uses an external `.json` file containing all questions and their true answers.
- 💾 (Optional) LocalStorage support for progress saving.
- ⏱️ (Optional) Timer and progress bar.

---

## 🏗️ Tech Stack

| Technology | Purpose |
|-------------|----------|
| **React** | Frontend library |
| **TypeScript** | Type-safe logic and interfaces |
| **Vite** or **CRA / Next.js** | Project setup options |
| **TailwindCSS (optional)** | Fast, clean UI styling |

---

## 📁 Project Structure

exam-automation/
├── src/
│ ├── components/
│ │ └── QuestionCard.tsx
│ ├── data/
│ │ └── questions.json
│ ├── pages/
│ │ └── Exam.tsx
│ ├── App.tsx
│ ├── index.tsx
│ └── types/
│ └── Question.ts
└── package.json

pgsql
Copy code

---

## 💾 Example JSON Format

Place your question bank inside `src/data/questions.json`:

[
  {
    "id": 1,
    "question": "Which gas is essential for photosynthesis?",
    "options": ["Nitrogen", "Oxygen", "Carbon Dioxide", "Hydrogen"],
    "answer": "Carbon Dioxide"
  },
  {
    "id": 2,
    "question": "What is the chemical symbol of water?",
    "options": ["O2", "H2O", "CO2", "HO"],
    "answer": "H2O"
  }
]
You can add up to 500 or more questions.
During each session, 50 questions will be selected randomly.

🧠 Core Exam Logic
When a user starts the exam:

The app loads all questions from the JSON file.

Randomly selects 50 unique questions.

Displays one question at a time.

When an answer is chosen:

If correct → shows ✅ Correct!

If incorrect → highlights the right answer in 🟩 green and user’s wrong choice in 🟥 red.

After confirming the answer, the Next button appears.

After the 50th question, the user sees their total score.

⚙️ Installation
1️⃣ Clone the repository

git clone https://github.com/your-username/exam-automation.git
cd exam-automation

2️⃣ Install dependencies

npm install
# or
yarn install

3️⃣ Run the project

npm run dev
 
🎓 Exam Session Flow
Step	Description
1️⃣ Start Exam	Loads all questions and randomly picks 50
2️⃣ Question 1	User answers — shows correct/incorrect
3️⃣ Next	Moves to next question
🔁 Repeat	Until all 50 questions are completed
✅ Result	Shows total correct count

🔮 Future Enhancements
🕒 Countdown timer for each question or total exam time

🧾 Export results as CSV/JSON

🗂 Admin panel for uploading new question sets

💾 Save progress & resume later

🌍 Multi-language support

🧑‍💻 Author
Built by Aga Khan with ❤️
Designed for automated, interactive, and educational testing experiences.

📜 License
This project is licensed under the MIT License — feel free to modify and distribute.

yaml
Copy code

---



# exam-automation
