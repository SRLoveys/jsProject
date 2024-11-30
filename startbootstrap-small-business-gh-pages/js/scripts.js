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
let mainImage = $("#main_image");
let imageArray = [];
let imageCounter = 0;

const questionBank = [
    "What does the letter H mean for scoring in bowling?",
    "What does the letter L mean for socring in bowling?",
    "What does the letter R mean for scoring in bowling?",
    "What does the letter C mean for scoring in bowling?",
    "What does the letter A mean for scoring in bowling?",
    "what does the letter S mean for scoring in bowling?",
    "What does a Turkey mean in bowling?",
    "What is a Perfect Game score in bowling?",
    "What does the Foul Line do in bowling?"
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
    "Q10 Answer"
]
const incorrectAnswerBank1 = [
    "",
    "Left Side", 
    "Right Side", 
    "Cut-off",
    "Arch",
    "Side",
    "Two Strikes In A Row",
    "300",
    "Negates Your Last Shot",
    "Incorrect answer for A9"
]

const incorrectAnswerBank2 = [
    "",
    "Left Hook", 
    "Right Hook", 
    "Clip",
    "Alley",
    "Snare",
    "Four Strikes In A Row",
    "400",
    "Removes You From The Game",
    "Incorrect answer for A9"
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
    imageCounter = (imageCounter + 1) % imageArray.length;
    const image = imageArray[imageCounter];
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
        $("#question").textContent = `Question ${questionNum+1}`;
        $("#question").nextElementSibling.textContent = questionBank[questionNum];
        answer = answerKey[questionNum];
    
        const options = document.getElementsByClassName("card-title");

        for (let option of options) {
            if (option.getAttribute("id") == `opt${answer}`) {
                option.nextElementSibling.textContent = answerBank[questionNum]
            } else {
                if (answer === "A") {
                    if (option.getAttribute("id") == "optB") {
                        $("#wrongChoice2").textContent = incorrectAnswerBank1[questionNum];
                    } else if (option.getAttribute("id") == "optC") {
                        $("#wrongChoice3").textContent = incorrectAnswerBank2[questionNum];
                    }
                } else if (answer === "B") {
                    if (option.getAttribute("id") == "optA") {
                        $("#wrongChoice1").textContent = incorrectAnswerBank1[questionNum];
                    } else if (option.getAttribute("id") == "optC") {
                        $("#wrongChoice3").textContent = incorrectAnswerBank2[questionNum];
                    }
                } else if (answer === "C") {
                    if (option.getAttribute("id") == "optA") {
                        $("#wrongChoice1").textContent = incorrectAnswerBank1[questionNum];
                    } else if (option.getAttribute("id") == "optB") {
                        $("#wrongChoice2").textContent = incorrectAnswerBank2[questionNum];
                    }
                }
            }
        };
        $(`#opt${answer}`).nextElementSibling.textContent = answerBank[questionNum];
        console.log(score)
    } else {document.location.href = "../startbootstrap-full-width-pics-gh-pages/index.html"}
    
};

// TODO add a timer that proceeds to the next question after 30 seconds.

document.addEventListener("DOMContentLoaded", () => {
    $("#aboutPage").addEventListener("click", evt => {
        evt.preventDefault();
        alert("Tester")
    });

    const links = $("#image_list").querySelectorAll("a");

    for (let link of links) {
        let image = new Image();
        image.src = link.href;
        imageArray[imageArray.length] = image;
    }


    $("#A").addEventListener("click", userChoice);
    $("#B").addEventListener("click", userChoice);
    $("#C").addEventListener("click", userChoice);
})