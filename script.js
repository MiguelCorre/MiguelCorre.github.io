const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const presentButton = document.getElementById('present-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const hideUI = document.getElementById('quiz')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
presentButton.addEventListener('click', startPresent)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startPresent() {
 resetState()
 location.href = "https://miguelcorre.github.io/present"
}

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    presentButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Para que país fomos na nossa primeira viagem juntos?',
    answers: [
      { text: 'Espanha', correct: false },
      { text: 'Itália', correct: true },
      { text: 'Inglaterra', correct: false },
      { text: 'Cabo Verde', correct: false }
    ]
  },
  {
    question: 'Qual o país que o Miguel quer mais visitar?',
    answers: [
      { text: 'Suiça', correct: false },
      { text: 'EUA', correct: false },
      { text: 'Coreia do Sul', correct: false },
      { text: 'Japao', correct: true }
    ]
  },
  {
    question: 'Qual a funçao do Miguel no trabalho?',
    answers: [
      { text: 'Fullstack Developer', correct: false },
      { text: 'Business Analyst', correct: false },
      { text: 'Java Developer', correct: true },
      { text: 'Database conosseuir', correct: false }
    ]
  },
  {
    question: 'No MuayThai, qual o nome que se dá a um pontapé na cabeça?',
    answers: [
      { text: 'High kick', correct: true },
      { text: 'Middle kick', correct: false },
      { text: 'Low kick', correct: false },
      { text: 'Pontapé na cabeça', correct: false }
    ]
  },
    {
    question: 'Qual o carro de sonho do Miguel?',
    answers: [
      { text: 'Seat Ibiza FR', correct: false},
      { text: 'Tesla Model 3', correct: true },
      { text: 'Renault Clio', correct: false },
      { text: 'Peugeot 108', correct: false }
    ]
  },
      {
    question: 'De quem é que o Miguel gosta mais?',
    answers: [
      { text: 'Da PS5', correct: false},
      { text: 'Do Computador', correct: false },
      { text: 'Da Vera', correct: true},
      { text: 'Dele mesmo lol', correct: false }
    ]
  },
]
