const questions = [
    {
      question: "1-Who directed the movie (Titanic)?",
      options: ["A) Steven Spielberg", "B) James Cameron", "C) Christopher Nolan", "D) Martin Scorsese"],
      correct: 1
    },
    {
      question: "2-What is the name of Tom Hanks' character in (Forrest Gump)?",
      options: ["A) Harley Davidson", "B) Forrest Gump", "C) Johnny Cash", "D) Jake Sully"],
      correct: 1
    },
    {
      question: "3-Which film won the Oscar for Best Picture in 2020?",
      options: ["A) 1917", "B) Parasite", "C) Once Upon a Time in Hollywood", "D) Joker"],
      correct: 1
    },
    {
        question: "4-Who stars in the movie (Gladiator)?",
        options: ["A) Russell Crowe", "B) Leonardo DiCaprio", "C) Tom Hardy", "D) Harrison Ford"],
        correct: 0
      },
      {
        question: "5-In which year was (The Shawshank Redemption) released?",
        options: ["A) 1990", "B) 1994", "C) 1996", "D) 2000"],
        correct: 1
      },
      {
        question: "6-What is the name of the fictional wizarding school in the (Harry Potter) series?",
        options: ["A) Durmstrang Institute", "B) Beauxbatons Academy", "C) Hogwarts School of Witchcraft and Wizardry", "D) Ilvermorny School of Witchcraft and Wizardry"],
        correct: 2
      },
      {
        question: "7-Who played the character of Jack Dawson in (Titanic)?",
        options: ["A) Brad Pitt", "B) Leonardo DiCaprio", "C) Johnny Depp", "D) Matt Damon"],
        correct: 1
      },
      {
        question: "8-What is the name of the superhero played by Robert Downey Jr. in the Marvel Cinematic Universe?",
        options: ["A) Captain America", "B) Iron Man", "C) Thor", "D) Hulk"],
        correct: 1
      },
      {
        question: "9-Which movie features the famous quote, (May the Force be with you)?",
        options: ["A) Star Wars", "B) The Matrix", "C) Lord of the Rings", "D) Harry Potter"],
        correct: 0
      },    {
        question: "10-What is the name of the fictional country in (Black Panther)?",
        options: ["A) Wakanda", "B) Genovia", "C) Zamunda", "D) Elbonia"],
        correct: 0
      },
      {
        question: "11-Which actor starred as the Joker in the 2008 film (The Dark Knight)?",
        options: ["A) Christian Bale", "B) Heath Ledger", "C) Jared Leto", "D) Joaquin Phoenix"],
        correct: 1
      },
      {
        question: "12-In which movie would you find the character (The Bride,) played by Uma Thurman?",
        options: ["A) Kill Bill", "B) Pulp Fiction", "C) Jackie Brown", "D) Death Proof"],
        correct: 0
      },
      {
        question: "13-Who directed the movie (Inception)?",
        options: ["A) Ridley Scott", "B) James Cameron", "C) Christopher Nolan", "D) Quentin Tarantino"],
        correct: 2
      },
      {
        question: "14-Which movie won the Academy Award for Best Picture in 1994?",
        options: ["A) Forrest Gump", "B) The Shawshank Redemption", "C) Pulp Fiction", "D) Braveheart"],
        correct: 0
      },
      {
        question: "15-What is the name of the first (Jurassic Park) movie released in 1993?",
        options: ["A) Jurassic World", "B) Jurassic Park III", "C) Jurassic Park", "D) The Lost World: Jurassic Park"],
        correct: 2
      },
      {
        question: "16-Which actress played Hermione Granger in the (Harry Potter) series?",
        options: ["A) Emma Stone", "B) Emma Watson", "C) Jennifer Lawrence", "D) Natalie Portman"],
        correct: 1
      },
      {
        question: "17-What is the main theme of the movie (The Matrix)?",
        options: ["A) Time travel", "B) Artificial intelligence and reality", "C) Space exploration", "D) Alien invasion"],
        correct: 1
      },
      {
        question: "18-Which film is known for the quote, (Here's looking at you, kid)?",
        options: ["A) Gone with the Wind", "B) Casablanca", "C) The Godfather", "D) Citizen Kane"],
        correct: 1
      },
      {
        question: "19-Which film features a large mechanical shark named Jaws?",
        options: ["A) Piranha", "B) Jaws", "C) The Abyss", "D) Deep Blue Sea"],
        correct: 1
      },
      {
        question: "20-Who played the character of Tony Stark in the (Iron Man) films?",
        options: ["A) Chris Hemsworth", "B) Robert Downey Jr.", "C) Chris Evans", "D) Mark Ruffalo"],
        correct:1
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