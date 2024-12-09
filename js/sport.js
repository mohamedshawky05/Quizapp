const questions = [
    {
      question: "1. Who is nicknamed (The Flea)?",
      options: ["A) Cristiano Ronaldo", "B) Lionel Messi", "C) Neymar", "D) Mohamed Salah"],
      correct: 1
    },
    {
      question: "2. How many players are on the field for each team during a soccer match?",
      options: ["10", "11", "12", "9"],
      correct: 1
    },
    {
      question: "3. Where was the 2018 FIFA World Cup held?",
      options: ["A) Germany", "B) Brazil", "C) Russia", "D) France"],
      correct: 2
    },  {
      question: "4. Which club has won the most UEFA Champions League titles?",
      options: ["A) Barcelona", "B) Manchester United", "C) Real Madrid", "D) AC Milan"],
      correct: 2
    },
    {
      question: "5. Which player has won the most Ballon d'Or awards?",
      options: ["A) Lionel Messi", "B) Cristiano Ronaldo", "C) Zinedine Zidane", "D) Ronaldinho"],
      correct: 0
    },
   {
      question: "6. How many FIFA World Cups has Brazil won?",
     options: ["3", "4", "5", "6"],
       correct: 2
     },  {
       question: "7. Which of these players has never played for Real Madrid?",
       options: ["A) Luka Modric", "B) Sergio Ramos", "C) David Beckham", "D) Frank Lampard"],
     correct: 3
     },
    {
      question: "8. Who won the FIFA World Cup in 2010?",
       options: ["A) Germany", "B) Spain", "C) Netherlands", "D) Argentina"],
       correct:1
   },
     {
       question: "9. Which is the first Arab team to reach the World Cup semi-finals?",
      options: ["A) Egypt", "B) Morocco", "C) Saudi Arabia", "D) Algeria"],
       correct: 1
     },  {
     question: "10. Which team is known as (The Red Devils)?",
       options: ["A) Liverpool", "B) Manchester United", "C) AC Milan", "D) Atletico Madrid"],
       correct: 1
     },
     {
       question: "11. Who scored the (Hand of God) goal?",
       options: ["A) Diego Maradona", "B) Pelé", "C) Lionel Messi", "D) Zinedine Zidane"],
       correct: 0
    },
    {
       question: "12. Which country has won the most FIFA World Cups?",
      options: ["A) Brazil", "B) Germany", "C) Italy", "D) Argentina"],
       correct: 0
    },  {
       question: "13. Who is the all-time top scorer in the UEFA Champions League?",
       options: ["A) Lionel Messi", "B) Cristiano Ronaldo", "C) Robert Lewandowski", "D) Karim Benzema"],
       correct: 1
     },
     {
      question: "14. What is the standard duration of a soccer match?",
      options: ["A) 60 minutes", "B) 90 minutes", "C) 120 minutes", "D) 80 minutes"],
       correct: 1
     },
     {
       question: "15. In which year was the first FIFA World Cup held?",
      options: ["A) 1920", "B) 1930", "C) 1940", "D) 1950"],
      correct: 1
     },  {
       question: "16. Who is the captain of the Argentine team that won the 2022 FIFA World Cup?",
       options: ["A) Lionel Messi", "B) Angel Di Maria", "C) Paulo Dybala", "D) Lautaro Martinez"],
       correct: 0
     },
    {
       question: "17. Which club is associated with the nickname (The Blues)?",
       options: ["A) Manchester City", "B) Chelsea", "C) Leicester City", "D) Everton"],
       correct: 1
     },
     {
       question: "18. Who scored the winning goal in the 2014 FIFA World Cup final?",
       options: ["A) Thomas Müller", "B) Mario Götze", "C) Miroslav Klose", "D) André Schürrle"],
       correct: 1
     },  {
      question: "19. Which country hosted the 2002 FIFA World Cup alongside South Korea?",
       options: ["A)Thailand", "B) China", "C)  Japan", "D) Indonesia"],
       correct: 2
     },
     {
      question: "20. Who is the only goalkeeper to win the Ballon d'Or?",
       options: ["A) Gianluigi Buffon", "B)  Iker Casillas", "C) Manuel Neuer", "D) Lev Yashin"],
       correct:3
     },
    
  ];
  
  let currentQuestion = 0;
  let answers = Array(questions.length).fill(null);
  let timer;
  let timeRemaining = 60;
  
  const questionNumberEl = document.getElementById("question-number");
  const questionTextEl = document.getElementById("question-text");
  const optionsEl = document.getElementById("options");
  const nextBtn = document.getElementById("next-btn");
  const timerEl = document.getElementById("timer");
  const resultEl = document.getElementById("result");
  const progressBar = document.getElementById("progress-bar");
  const scorePercentage = document.getElementById("score-percentage");
  const percentageText = document.getElementById("percentage-text");
  const scoreText = document.getElementById("score-text");
  const usernameEl = document.getElementById("username");
  const showAnswersBtn = document.getElementById("show-answers-btn");
  const answersList = document.getElementById("answers-list");
  
  // Load username from LocalStorage
  // const username = localStorage.getItem("fullName") || "fullName";
  // usernameEl.textContent = `Hello, ${username}!`;
  
  function startTimer() {
    timeRemaining = 60;
    updateTimerDisplay();
    timer = setInterval(() => {
      timeRemaining--;
      updateTimerDisplay();
  
      if (timeRemaining <= 0) {
        clearInterval(timer);
        nextQuestion();
      }
    }, 1000);
  }
  
  function updateTimerDisplay() {
    timerEl.textContent = `Time Remaining: ${timeRemaining}s`;
    if (timeRemaining <= 10) {
      timerEl.classList.add("low-time");
    } else {
      timerEl.classList.remove("low-time");
    }
  }
  
  function loadQuestion(index) {
    clearInterval(timer);
    const question = questions[index];
    questionNumberEl.textContent = `Question ${index + 1} of ${questions.length}`;
    questionTextEl.textContent = question.question;
    optionsEl.innerHTML = question.options
      .map(
        (option, i) => `
        <button class="btn btn-outline-primary w-100 my-1 ${
          answers[index] === i ? "active" : ""
        }" onclick="selectAnswer(${i})">${option}</button>
      `
      )
      .join("");
    nextBtn.disabled = answers[index] === null;
    startTimer();
  }
  
  function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      loadQuestion(currentQuestion);
    } else {
      showResult();
    }
  }
  
  function selectAnswer(optionIndex) {
    answers[currentQuestion] = optionIndex;
    localStorage.setItem("quizAnswers", JSON.stringify(answers));
    nextBtn.disabled = false;
    clearInterval(timer);
    loadQuestion(currentQuestion);
  }
  
  function showResult() {
    const correctAnswers = answers.filter(
      (answer, index) => answer === questions[index].correct
    ).length;
    const percentage = Math.round((correctAnswers / questions.length) * 100);
  
    progressBar.style.strokeDasharray = `${percentage}, 100`;
    percentageText.textContent = `${percentage}%`;
    scoreText.textContent = `You answered ${correctAnswers} out of ${questions.length} questions correctly.`;
  
    document.getElementById("quiz-container").classList.add("d-none");
    resultEl.classList.remove("d-none");
  
    // Add functionality to "Show Answers" button
    showAnswersBtn.addEventListener("click", () => {
      answersList.classList.toggle("d-none");
      answersList.innerHTML = questions
        .map(
          (question, index) => `
          <div>
            <strong>Q${index + 1}: ${question.question}</strong><br>
            Your Answer: ${
              answers[index] !== null
                ? question.options[answers[index]]
                : "No Answer"
            }<br>
            Correct Answer: ${question.options[question.correct]}
          </div><hr>
        `
        )
        .join("");
    });
  }
  
  nextBtn.addEventListener("click", nextQuestion);
  
  loadQuestion(currentQuestion);