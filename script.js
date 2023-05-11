const questions = [
    {
        question: "Who is the largest animal in the world",
        answers: [
            { Text: "Shark", correct: false},
            { Text: "Blue Whale", correct: true},
            { Text: "Elephant", correct: false},
            { Text: "Friend", correct: false},
        ]
    },
    {
        question: "Which is the capital city of turkey",
        answers: [
            { Text: "istanbul", correct: false},
            { Text: "Ankara", correct: true},
            { Text: "Afyon", correct: false},
            { Text: "Trabzon", correct: false},
        ]
    },
    {
        question: "What is my name",
        answers: [
            { Text: "Ali", correct: true},
            { Text: "Ali", correct: true},
            { Text: "Ali", correct: true},
            { Text: "Ali", correct: true},
        ]
    },
    {
        question: "Wich color is the sky",
        answers: [
            { Text: "White", correct: false},
            { Text: "Blue", correct: false},
            { Text: "Yellow", correct: false},
            { Text: "Open Blue", correct: true},
        ]
    },
    {
        question: "Who is the smallest continent in the world",
        answers: [
            { Text: "ASIA", correct: false},
            { Text: "AUSTRALIA", correct: true},
            { Text: "AFRICA", correct: false},
            { Text: "EUROPE", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML ="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct= answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display="block";
    
    
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML ="Restart Test";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}




nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();