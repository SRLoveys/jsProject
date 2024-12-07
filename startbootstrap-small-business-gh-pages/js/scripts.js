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
let totalTime = 0;
let questionNum = 0;
let answer = "C";
let mainImage = $("#main_image");
let imageArray = [];
let imageCounter = 0;
let question = 1;

const questionBank = [
    "What does the letter H mean for scoring in bowling?",
    "What does the letter L mean for scoring in bowling?",
    "What does the letter R mean for scoring in bowling?",
    "What does the letter C mean for scoring in bowling?",
    "What does the letter A mean for scoring in bowling?",
    "What does the letter S mean for scoring in bowling?",
    "What does a Turkey mean in bowling?",
    "What is a Perfect Game score in bowling?",
    "What does the Foul Line do in bowling?",
    "What is the added value of all the pins?"
]
const answerBank = [
    "Headpin",
    "Left Corner",
    "Right Corner",
    "Chop-off",
    "Aces",
    "Split",
    "Three Strikes In A Row",
    "450",
    "Makes loud noise and reduces score by 15",
    "15"
]
const incorrectAnswerBank1 = [
    "Hook",
    "Left Side", 
    "Right Side", 
    "Cut-off",
    "Arch",
    "Side",
    "Two Strikes In A Row",
    "300",
    "Negates Your Last Shot",
    "10"
]

const incorrectAnswerBank2 = [
    "Hambone",
    "Left Hook", 
    "Right Hook", 
    "Clip",
    "Alley",
    "Snare",
    "Four Strikes In A Row",
    "400",
    "Removes You From The Game",
    "20"
]

const answerKey = ["C", "B", "B", "A", "B", "C", "A", "C", "C", "B"];

let usedNumbers = [];

let countdown = null;

const userChoice = evt => {
    const thisElement = evt.currentTarget;

    if (thisElement.getAttribute("id") == answer) {
        thisElement.setAttribute("class", "button correct");
        thisElement.setAttribute("disabled", "true");
        document.getElementById("correctAudio").play();
        score += 1;
        localStorage.setItem("totalScore", score);
    } 
    else {
        thisElement.setAttribute("class", "button incorrect");
        document.getElementById("incorrectAudio").play();
    }
    
    const buttons = document.getElementsByClassName("button");
    for (let button of buttons) {
        button.setAttribute("disabled", "true");
    };

    setTimeout(nextQuestion, 1000);
    setTimeout(() => {
        for( let button of buttons) {
            button.removeAttribute("disabled");
        }
        thisElement.removeAttribute("disabled");
        thisElement.setAttribute("class", "button");
    }, 1000);
}

const randomQuestion = () => {
    let randomNumbers = null;

    do {
        randomNumbers = Math.floor(Math.random() * questionBank.length);
    } while(usedNumbers.includes(randomNumbers) && usedNumbers.length < questionBank.length);

    if (usedNumbers.length >= questionBank.length) {
        return null;
    }

    usedNumbers[usedNumbers.length] = randomNumbers;

    return randomNumbers;
}

const nextQuestion = () => {
    questionNum = randomQuestion();
    clearInterval(countdown);
    clock();
    $("#timer").textContent = 10;
    if (questionNum == null) {
        document.location.href = "../startbootstrap-full-width-pics-gh-pages/index.html"
    }

    const image = imageArray[questionNum];
    mainImage.src = image.src;

    if (image.src.endsWith("imagePerfect.jpg")) {
        mainImage.style.objectFit = "contain"; 
        mainImage.style.width = "900px";      
        mainImage.style.height = "400px";      
    } else {
        mainImage.style.objectFit = "cover";
        mainImage.style.width = "900px";
        mainImage.style.height = "400px";
    }

    if (questionNum <= questionBank.length-1){
        $("#question").textContent = `Question ${question}`;
        $("#question").nextElementSibling.textContent = questionBank[questionNum];
        answer = answerKey[questionNum];
    
        const options = document.getElementsByClassName("card-title");

        for (let option of options) {
            if (option.getAttribute("id") == `opt${answer}`) {
                option.textContent = answerBank[questionNum]
            } else {
                if (answer === "A") {
                    if (option.getAttribute("id") == "optB") {
                        option.textContent = incorrectAnswerBank1[questionNum];
                    } else if (option.getAttribute("id") == "optC") {
                        option.textContent = incorrectAnswerBank2[questionNum];
                    }
                } else if (answer === "B") {
                    if (option.getAttribute("id") == "optA") {
                        option.textContent = incorrectAnswerBank1[questionNum];
                    } else if (option.getAttribute("id") == "optC") {
                        option.textContent = incorrectAnswerBank2[questionNum];
                    }
                } else if (answer === "C") {
                    if (option.getAttribute("id") == "optA") {
                        option.textContent = incorrectAnswerBank1[questionNum];
                    } else if (option.getAttribute("id") == "optB") {
                        option.textContent = incorrectAnswerBank2[questionNum];
                    }
                }
            }
        };
        $(`#opt${answer}`).textContent = answerBank[questionNum];

    };
    question += 1;
};

const clock = () => {
    countdown = setInterval(() => {
        $("#timer").textContent -= 1;
        totalTime += 1;
        localStorage.setItem("totalTime", totalTime);
        if ($("#timer").textContent == -1) {
            
            clearInterval(countdown);
            countdown = null;
            document.getElementById("incorrectAudio").play();
            alert("You have run out of Time!");
            nextQuestion();

        }
    }, 1000);
};

document.addEventListener("DOMContentLoaded", () => {
    $("#aboutPage").addEventListener("click", evt => {
        evt.preventDefault();
        alert("Bowling Trivia website by Sheldon Jacque and Steven Loveys for a JavaScript Project, Goodluck!")
    });

    const links = $("#image_list").querySelectorAll("a");

    for (let link of links) {
        let image = new Image();
        image.src = link.href;
        imageArray[imageArray.length] = image;
    }

    nextQuestion();
    $("#A").addEventListener("click", userChoice);
    $("#B").addEventListener("click", userChoice);
    $("#C").addEventListener("click", userChoice);
})