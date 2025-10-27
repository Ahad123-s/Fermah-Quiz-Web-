const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const prevButton = document.getElementById('prev-btn');
const restartButton = document.getElementById('restart-btn');
const questionContainer = document.getElementById('question-container');
const resultContainer = document.getElementById('result-container');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const scoreElement = document.getElementById('score');

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswers = new Array(10).fill(null);

const questions = [
  {
    question: "What type of market is Fermah described as?",
    answers: [
      "A peer-to-peer lending market",
      "A universal proof market",
      "A decentralized data marketplace",
      "A token trading marketplace"
    ],
    correct: 1
  },
  {
    question: "Which of the following is NOT listed as a challenge in current zero-knowledge proof generation?",
    answers: [
      "The infrastructure is expensive and demands powerful hardware",
      "The infrastructure faces low utilization rates",
      "The incentive structure for infrastructure is easy to design",
      "Proof generation today is slow and unreliable"
    ],
    correct: 2
  },
  {
    question: "On the supply side of Fermah’s network, what kind of machines are mentioned?",
    answers: [
      "Smartphones",
      "GPUs and CPUs run by EigenLayer Operators",
      "Traditional relational database servers",
      "Smart home devices"
    ],
    correct: 1
  },
  {
    question: "What role does the Matchmaker play in Fermah’s architecture?",
    answers: [
      "It issues tokens to users",
      "It encrypts proof data",
      "It aligns demand and supply by assigning proof requests to suitable nodes",
      "It mines new proofs"
    ],
    correct: 2
  },
  {
    question: "Which of the following proof systems is Fermah designed to support?",
    answers: [
      "Only Groth16",
      "Only zkEVM",
      "zkVMs, zkEVMs, and Groth16 (i.e., all proof systems)",
      "None of the above"
    ],
    correct: 2
  },
  {
    question: "According to the Key Terms page, what is a 'Seeker'?",
    answers: [
      "A node that generates proofs",
      "A user who submits proof requests",
      "The algorithm verifying proofs",
      "A proof-system setup parameter"
    ],
    correct: 1
  },
  {
    question: "A 'Proof System' consists of three parts. Which of these is NOT one of them?",
    answers: [
      "Setup parameters",
      "Prover algorithm",
      "Verifier algorithm",
      "Matchmaker logic"
    ],
    correct: 3
  },
  {
    question: "Which term describes the generic algorithm variant that covers a large class of computations?",
    answers: [
      "zkVM",
      "Groth16",
      "Specific-computation Prover",
      "Traditional VM"
    ],
    correct: 0
  },
  {
    question: "What is one of the key optimization goals for Fermah mentioned in the Overview?",
    answers: [
      "To increase the cost of proof generation",
      "To minimize machine utilization",
      "To optimize for cheap, fast, and reliable proof generation",
      "To support only a single proof system"
    ],
    correct: 2
  },
  {
    question: "Which of the following best describes Fermah’s position on neutrality?",
    answers: [
      "It is biased toward a single proof system",
      "It is credibly neutral and supports all proof systems",
      "It supports only proprietary hardware",
      "It is restricted to one chain’s VM"
    ],
    correct: 1
  }
];

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', nextQuestion);
prevButton.addEventListener('click', prevQuestion);
restartButton.addEventListener('click', restartQuiz);

function startQuiz() {
  startButton.classList.add('hide');
  questionContainer.classList.remove('hide');
  showQuestion(currentQuestionIndex);
}

function showQuestion(index) {
  fadeTransition(() => {
    resetState();
    const question = questions[index];
    questionElement.innerText = `${index + 1}. ${question.question}`;
    questionElement.classList.add('fade-in');
    question.answers.forEach((answer, i) => {
      const button = document.createElement('button');
      button.innerText = answer;
      button.classList.add('btn');
      if (selectedAnswers[index] === i) {
        button.classList.add('selected');
      }
      button.addEventListener('click', () => selectAnswer(i));
      answerButtons.appendChild(button);
    });
  });
}

function resetState() {
  answerButtons.innerHTML = '';
}

function selectAnswer(selectedIndex) {
  selectedAnswers[currentQuestionIndex] = selectedIndex;
  Array.from(answerButtons.children).forEach((btn, i) => {
    btn.classList.toggle('selected', i === selectedIndex);
  });
}

function nextQuestion() {
  if (selectedAnswers[currentQuestionIndex] === null)
    return alert("Please select an answer before proceeding!");
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showQuestion(currentQuestionIndex);
  } else {
    finishQuiz();
  }
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    showQuestion(currentQuestionIndex);
  }
}

function finishQuiz() {
  fadeTransition(() => {
    questionContainer.classList.add('hide');
    resultContainer.classList.remove('hide');
    score = selectedAnswers.reduce(
      (acc, ans, i) => acc + (ans === questions[i].correct ? 1 : 0),
      0
    );
    scoreElement.innerText = score;
  });
}

function restartQuiz() {
  resultContainer.classList.add('hide');
  startButton.classList.remove('hide');
  currentQuestionIndex = 0;
  score = 0;
  selectedAnswers.fill(null);
}

/* 🔄 Fade Transition Function */
function fadeTransition(callback) {
  questionContainer.classList.add('fade-out');
  setTimeout(() => {
    questionContainer.classList.remove('fade-out');
    callback();
  }, 400);
}
