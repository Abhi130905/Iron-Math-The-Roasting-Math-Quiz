import './style.css';

const roasts = [
  "Oh wow, you pressed buttons. Too bad they were the wrong ones.",
  "My grandmother could calculate that faster, and she's a literal fossil.",
  "I've seen more intelligent behavior from a Roomba stuck in a corner.",
  "Are you actively trying to be wrong, or does it just come naturally to you?",
  "That answer is so wrong I'm actually impressed by your creativity.",
  "Even a broken clock is right twice a day. You, on the other hand...",
  "I asked my toaster to solve this, and it got it right. What's your excuse?",
  "Tony Stark was able to build this in a cave! With a box of scraps! You can't even add.",
  "I'm deducting points from your IQ score just for that attempt.",
  "If wrong answers were a currency, you'd be a billionaire right now."
];

const praises = [
  "Wow, you actually got one right. I'm taking a screenshot.",
  "Did you cheat? Be honest.",
  "I guess miracles do happen.",
  "Even a blind squirrel finds a nut occasionally.",
  "Correct! Don't let it go to your head, though.",
  "I suppose that's right... if you're into things like 'facts' and 'logic'.",
  "You're not completely useless after all. Just mostly.",
  "Congratulations, you have the basic math skills of a fifth grader.",
  "I'll admit, that was mildly impressive. Very mildly."
];

const verdicts = {
  perfect: "You are Iron Man. (10/10)",
  good: "Not bad, kid. You've got potential. (7-9/10)",
  average: "You're definitely an NPC in this universe. (4-6/10)",
  bad: "I'm revoking your Avengers access card. (0-3/10)"
};

let currentQuestion = 0;
let score = 0;
const totalQuestions = 10;
let correctAnswer = 0;

// DOM Elements
const questionText = document.getElementById('question-text');
const answerInput = document.getElementById('answer-input');
const submitBtn = document.getElementById('submit-btn');
const progressFill = document.getElementById('progress-fill');
const scoreDisplay = document.getElementById('score-display');
const roastPopup = document.getElementById('roast-popup');
const correctPopup = document.getElementById('correct-popup');
const roastText = document.getElementById('roast-text');
const correctText = document.getElementById('correct-text');
const nextBtnWrong = document.getElementById('next-btn-wrong');
const nextBtnCorrect = document.getElementById('next-btn-correct');
const mainArea = document.querySelector('main');
const resultsContainer = document.getElementById('results-container');
const restartBtn = document.getElementById('restart-btn');
const appContainer = document.getElementById('quiz-container');

function generateQuestion() {
  const operations = ['+', '-', '*'];
  const op = operations[Math.floor(Math.random() * operations.length)];
  let num1, num2;

  switch(op) {
    case '+':
      num1 = Math.floor(Math.random() * 50) + 1;
      num2 = Math.floor(Math.random() * 50) + 1;
      correctAnswer = num1 + num2;
      break;
    case '-':
      num1 = Math.floor(Math.random() * 50) + 10;
      num2 = Math.floor(Math.random() * num1); // Ensure positive result
      correctAnswer = num1 - num2;
      break;
    case '*':
      num1 = Math.floor(Math.random() * 12) + 2;
      num2 = Math.floor(Math.random() * 12) + 2;
      correctAnswer = num1 * num2;
      break;
  }

  questionText.textContent = `${num1} ${op} ${num2} = ?`;
  answerInput.value = '';
  answerInput.focus();
  
  // Update progress
  progressFill.style.width = `${((currentQuestion) / totalQuestions) * 100}%`;
  scoreDisplay.textContent = `Question: ${currentQuestion + 1} / ${totalQuestions} | Score: ${score}`;
}

function getRandomRoast() {
  return roasts[Math.floor(Math.random() * roasts.length)];
}

function getRandomPraise() {
  return praises[Math.floor(Math.random() * praises.length)];
}

function checkAnswer() {
  if (!roastPopup.classList.contains('hidden') || !correctPopup.classList.contains('hidden')) {
    return;
  }

  const userAnswer = parseInt(answerInput.value, 10);
  
  if (isNaN(userAnswer)) {
    appContainer.classList.add('shake', 'damage-flash');
    setTimeout(() => appContainer.classList.remove('shake', 'damage-flash'), 500);
    return;
  }

  if (userAnswer === correctAnswer) {
    score++;
    correctText.textContent = getRandomPraise();
    correctPopup.classList.remove('hidden');
    nextBtnCorrect.focus();
  } else {
    roastText.textContent = getRandomRoast();
    roastPopup.classList.remove('hidden');
    appContainer.classList.add('shake', 'damage-flash');
    setTimeout(() => appContainer.classList.remove('shake', 'damage-flash'), 500);
    nextBtnWrong.focus();
  }
}

function nextQuestion() {
  roastPopup.classList.add('hidden');
  correctPopup.classList.add('hidden');
  currentQuestion++;

  if (currentQuestion >= totalQuestions) {
    showResults();
  } else {
    generateQuestion();
  }
}

function showResults() {
  mainArea.classList.add('hidden');
  document.querySelector('header').classList.add('hidden');
  resultsContainer.classList.remove('hidden');

  const finalScoreEl = document.getElementById('final-score');
  const finalVerdictEl = document.getElementById('final-verdict');

  finalScoreEl.textContent = `Your Score: ${score} / ${totalQuestions}`;

  if (score === 10) {
    finalVerdictEl.textContent = verdicts.perfect;
  } else if (score >= 7) {
    finalVerdictEl.textContent = verdicts.good;
  } else if (score >= 4) {
    finalVerdictEl.textContent = verdicts.average;
  } else {
    finalVerdictEl.textContent = verdicts.bad;
  }
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  resultsContainer.classList.add('hidden');
  mainArea.classList.remove('hidden');
  document.querySelector('header').classList.remove('hidden');
  generateQuestion();
}

// Event Listeners
submitBtn.addEventListener('click', checkAnswer);
answerInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    checkAnswer();
  }
});

nextBtnWrong.addEventListener('click', nextQuestion);
nextBtnCorrect.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);

// Initialize
generateQuestion();
