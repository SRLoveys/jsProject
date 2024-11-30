/*!
* Start Bootstrap - Small Business v5.0.6 (https://startbootstrap.com/template/small-business)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-small-business/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project
"use strict";

const $ = (selector) => document.querySelector(selector);

let score = 0;
let questionNum = 0;
let answer = "C";
const questionBank = [
    "What does H mean in bowling?",
    "What does L mean in bowling?",
    "What does R mean in bowling?",
    "What does C mean in bowling?",
    "What does A mean in bowling?",
    "what does S mean in bowling?",
    "What does a Turkey mean in bowling?",
    "What is a Perfect Game in bowling?",
    "What is the Foul Line in bowling?"
]
const answerBank = [
    "Q1 Answer",
    "Q2 Answer",
    "Q3 Answer",
    "Q4 Answer",
    "Q5 Answer",
    "Q6 Answer",
    "Q7 Answer",
    "Q8 Answer",
    "Q9 Answer",
    "Q10 Answer"
]

const answerKey = ["C", "B", "B", "A", "B", "C", "A", "C", "C", "B"];

let timer = null;
let clock = null;

const userChoice = evt => {
    const thisElement = evt.currentTarget;

    if (thisElement.getAttribute("id") == answer) {
        thisElement.setAttribute("class", "button correct");
        thisElement.setAttribute("disabled", "true");
        score += 1;
    } else {thisElement.setAttribute("class", "button incorrect")}
    
    const buttons = document.getElementsByClassName("button");
    for (let button of buttons) {
        button.setAttribute("disabled", "true");
    };

    setTimeout(nextQuestion, 1500);
    setTimeout(() => {
        for( let button of buttons) {
            button.removeAttribute("disabled");
        }
        thisElement.removeAttribute("disabled");
        thisElement.setAttribute("class", "button");
    }, 1500);
}

const nextQuestion = () => {
    questionNum += 1;

    if (questionNum <= questionBank.length-1){
        $("#question").textContent = `Question ${questionNum+1}`;
        $("#question").nextElementSibling.textContent = questionBank[questionNum];
        answer = answerKey[questionNum];
    
        const options = document.getElementsByClassName("card-title");
        for (let option of options) {
            if (option.getAttribute("id") == `opt${answer}`) {
                option.nextElementSibling.textContent = answerBank[questionNum]
            } else {option.nextElementSibling.textContent = "Incorrect Answer"}
        };
        $(`#opt${answer}`).nextElementSibling.textContent = answerBank[questionNum];
        console.log(score)
    } else {document.location.href = "../startbootstrap-full-width-pics-gh-pages/index.html"}
    
};

// TODO add a timer that proceeds to the next question after 30 seconds.

// Add actual correct answers and incorrect answers.


document.addEventListener("DOMContentLoaded", () => {
    $("#aboutPage").addEventListener("click", evt => {
        evt.preventDefault();
        alert("Tester")
    })

    $("#A").addEventListener("click", userChoice);
    $("#B").addEventListener("click", userChoice);
    $("#C").addEventListener("click", userChoice);
})