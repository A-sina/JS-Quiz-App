import formatData from "./help.js";

const difficulty = JSON.parse(localStorage.getItem("difficulty"));
const CORRECT_BONUS = 10;
const URL = `https://opentdb.com/api.php?amount=10&difficulty=${difficulty || "medium"}&type=multiple`;
const container = document.getElementById("container");
const loader = document.getElementById("loader");
const questionShow = document.getElementById("question-text");
const answersShow = document.querySelectorAll(".answer-question");
const nextBTN = document.getElementById("next-button");
const QuestionNum = document.getElementById("question-no");
const scores = document.getElementById("scores");
const finish = document.getElementById("finish-button");
const error = document.querySelector("h1");
let formatedData = null;
let questionIndex = 0;
let correctAnswer = null;
let questionNo = 1;
let score = 0;
let isAccepted = true;


const fetchData = async () => {
    try {
        const res = await fetch(URL)
        const data = await res.json();
        formatedData = formatData(data.results);
        start();
    } catch (err) {
        error.innerHTML = `there is an error please refresh`;
        loader.style.display = "none";
    }
}


const checkAnswer = (event, index) => {
    if (!isAccepted) {return}
    isAccepted = false;
    const isCorrect = index === correctAnswer ? true:false;
    if (isCorrect) {
        event.target.classList.add("correct");
        score += CORRECT_BONUS;
        scores.innerText = score;

    } else {
        event.target.classList.add("incorrect");
        answersShow[correctAnswer].classList.add("correct");
        
    }
}


const showQuestions = () => {
    const {question, answers, correctAnswerIndex} = formatedData[questionIndex]
    questionShow.innerText = question;
    correctAnswer = correctAnswerIndex;
    answersShow.forEach((button, index) => {
        button.innerText = answers[index];
    });
}


const nextQuestion = () => {
    isAccepted = true;
    questionIndex += 1;
    questionNo += 1;
    QuestionNum.innerText = questionNo;
    if (questionNo > formatedData.length) {
        QuestionNum.innerText = 10;
        window.location.assign("../html/end.html");
        localStorage.setItem("point", score)
    }
    answersShow.forEach((button) => {
        button.classList.remove("correct");
        button.classList.remove("incorrect");
    })
    showQuestions();
}


const start = () => {
    container.style.display = "block";
    loader.style.display = "none";
    showQuestions();
    localStorage.removeItem("point")
    localStorage.removeItem("difficulty")
}


const finishHandler = () => {
    window.location.assign("../html/end.html");
    localStorage.setItem("point", JSON.stringify(score))
}


finish.addEventListener("click", finishHandler)
nextBTN.addEventListener("click", nextQuestion)
window.addEventListener("load", fetchData);
answersShow.forEach((button, index) => {
    button.addEventListener("click", (event) => checkAnswer(event, index))
});
