// -------------------------
// FRÅGOR
// -------------------------

let questions = [

    {
        question: "Vad är huvudstaden i Finland?",
        answers: [
            "Stockholm",
            "Helsingfors",
            "Oslo"
        ],
        correct: 2
    },

    {
        question: "Hur många dagar har en vecka?",
        answers: [
            "5",
            "7",
            "10"
        ],
        correct: 2
    },

    {
        question: "Vilken planet är närmast solen?",
        answers: [
            "Merkurius",
            "Mars",
            "Jupiter"
        ],
        correct: 1
    },

    {
        question: "Hur många månader har ett år?",
        answers: [
            "10",
            "11",
            "12"
        ],
        correct: 3
    },

    {
        question: "Vilket land ligger Paris i?",
        answers: [
            "Frankrike",
            "Spanien",
            "Italien"
        ],
        correct: 1
    },

    {
        question: "Vad är 5 + 5?",
        answers: [
            "8",
            "10",
            "12"
        ],
        correct: 2
    },

    {
        question: "Vilket djur säger mjau?",
        answers: [
            "Hund",
            "Katt",
            "Häst"
        ],
        correct: 2
    },

    {
        question: "Vilket språk talas huvudsakligen i Sverige?",
        answers: [
            "Svenska",
            "Finska",
            "Tyska"
        ],
        correct: 1
    },

    {
        question: "Hur många ben har en spindel?",
        answers: [
            "6",
            "8",
            "10"
        ],
        correct: 2
    },

    {
        question: "Vilken färg får man om man blandar blått och gult?",
        answers: [
            "Grönt",
            "Rött",
            "Lila"
        ],
        correct: 1
    }

];


// -------------------------
// VARIABLER
// -------------------------

let currentQuestion = 0;
let points = 0;


// -------------------------
// HTML-ELEMENT
// -------------------------

let gameStart =
    document.getElementById("game-start");

let gameProgress =
    document.getElementById("game-in-progress");

let gameFeedback =
    document.getElementById("game-feedback");


let startButton =
    document.getElementById("start-game-btn");

let nextButton =
    document.getElementById("user-answer-btn");

let restartButton =
    document.getElementById("restart-game-btn");


let nameInput =
    document.getElementById("name-input");

let playerName =
    document.getElementById("player-name");

let playerPoints =
    document.getElementById("player-points");


let questionField =
    document.getElementById("question-field");

let answer1Field =
    document.getElementById("answer-1-field");

let answer2Field =
    document.getElementById("answer-2-field");

let answer3Field =
    document.getElementById("answer-3-field");


let totalPlayerPoints =
    document.getElementById("total-player-points");


// -------------------------
// GÖM SPELET FRÅN BÖRJAN
// -------------------------

gameProgress.style.display = "none";
gameFeedback.style.display = "none";


// -------------------------
// STARTA SPELET
// -------------------------

startButton.addEventListener(
    "click",
    function () {

        let name =
            nameInput.value.trim();

        if (name === "") {

            alert(
                "Skriv in ditt namn först!"
            );

            return;
        }


        currentQuestion = 0;
        points = 0;


        playerName.innerHTML =
            name;

        playerPoints.innerHTML =
            points;


        gameStart.style.display =
            "none";

        gameFeedback.style.display =
            "none";

        gameProgress.style.display =
            "block";


        showQuestion();

    }
);


// -------------------------
// VISA FRÅGA
// -------------------------

function showQuestion() {

    let question =
        questions[currentQuestion];


    questionField.innerHTML =
        "Fråga " +
        (currentQuestion + 1) +
        " av 10: " +
        question.question;


    answer1Field.innerHTML =
        question.answers[0];

    answer2Field.innerHTML =
        question.answers[1];

    answer3Field.innerHTML =
        question.answers[2];


    let answers =
        document.querySelectorAll(
            'input[name="answers"]'
        );


    for (
        let i = 0;
        i < answers.length;
        i++
    ) {

        answers[i].checked =
            false;

    }

}


// -------------------------
// SVARA / NÄSTA FRÅGA
// -------------------------

nextButton.addEventListener(
    "click",
    function () {

        let selectedAnswer =
            document.querySelector(
                'input[name="answers"]:checked'
            );


        if (selectedAnswer === null) {

            alert(
                "Välj ett svar först!"
            );

            return;
        }


        let answerNumber =
            Number(
                selectedAnswer.value
            );


        if (
            answerNumber ===
            questions[currentQuestion].correct
        ) {

            points++;

        }


        playerPoints.innerHTML =
            points;


        currentQuestion++;


        if (
            currentQuestion <
            questions.length
        ) {

            showQuestion();

        } else {

            showResult();

        }

    }
);


// -------------------------
// VISA RESULTAT
// -------------------------

function showResult() {

    gameProgress.style.display =
        "none";

    gameFeedback.style.display =
        "block";


    totalPlayerPoints.innerHTML =
        points + " / 10";


    let heading =
        gameFeedback.querySelector("h2");

    let text =
        gameFeedback.querySelector("p");


    if (points <= 3) {

        heading.innerHTML =
            "Du behöver öva lite mer!";

        text.innerHTML =
            playerName.innerHTML +
            ", du fick " +
            points +
            " av 10 poäng.";

    }


    else if (points <= 6) {

        heading.innerHTML =
            "Bra försök!";

        text.innerHTML =
            playerName.innerHTML +
            ", du fick " +
            points +
            " av 10 poäng.";

    }


    else if (points <= 9) {

        heading.innerHTML =
            "Mycket bra!";

        text.innerHTML =
            playerName.innerHTML +
            ", du fick " +
            points +
            " av 10 poäng.";

    }


    else {

        heading.innerHTML =
            "Perfekt! Alla rätt!";

        text.innerHTML =
            playerName.innerHTML +
            ", du fick 10 av 10 poäng!";

        createConfetti();

    }

}


// -------------------------
// STARTA OM
// -------------------------

restartButton.addEventListener(
    "click",
    function () {

        currentQuestion = 0;
        points = 0;


        playerPoints.innerHTML =
            0;


        removeConfetti();


        gameFeedback.style.display =
            "none";

        gameProgress.style.display =
            "none";

        gameStart.style.display =
            "block";


        nameInput.value =
            "";

    }
);


// -------------------------
// KONFETTI
// -------------------------

function createConfetti() {

    let confettiFrame =
        document.getElementById(
            "confetti-frame"
        );


    for (
        let i = 0;
        i < 100;
        i++
    ) {

        let confetti =
            document.createElement(
                "div"
            );


        confetti.className =
            "confetti";


        confetti.style.left =
            Math.random() * 100 +
            "vw";


        confetti.style.backgroundColor =
            "hsl(" +
            Math.random() * 360 +
            ", 100%, 50%)";


        confetti.style.animation =
            "fall " +
            (2 + Math.random() * 3) +
            "s linear forwards";


        confettiFrame.appendChild(
            confetti
        );

    }

}


// -------------------------
// TA BORT KONFETTI
// -------------------------

function removeConfetti() {

    let confetti =
        document.querySelectorAll(
            ".confetti"
        );


    for (
        let i = 0;
        i < confetti.length;
        i++
    ) {

        confetti[i].remove();

    }

}