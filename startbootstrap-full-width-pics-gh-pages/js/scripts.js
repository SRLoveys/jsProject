/*!
* Start Bootstrap - Full Width Pics v5.0.6 (https://startbootstrap.com/template/full-width-pics)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-full-width-pics/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project
"use strict";

const $ = (selector) => document.querySelector(selector);

const score = localStorage.getItem("totalScore");
let time = parseInt(localStorage.getItem("totalTime"));
let minutes = 0;
let message = "";
let finalImage = $("#finalImage")

document.addEventListener("DOMContentLoaded", () => {
    $("#aboutPage").addEventListener("click", evt => {
        evt.preventDefault();
        alert("Bowling Trivia website by Sheldon Jacque and Steven Loveys for a JavaScript Project, Goodluck!")
    })

    if (time >= 60) {
        minutes += 1
        time -= 60
    }

    if (score <= 5) {
        message = "Better luck next time!"
        finalImage.src = "../images/gutterGif.gif"
    } else if (score == 6 || score <= 7) {
        message = "Good Job!"
    } else if (score == 8 || score == 9) {
        message = "Amazing!"
        finalImage.src = "../images/soCloseGif.gif"
    } else {
        message = "PERFECT SCORE!"
        finalImage.src = "../images/strikeGif.gif"
    }
let percentScore = score * 10;

    $("#scoreParagraph").textContent = `You got ${score}/10 (${percentScore}%) correct in ${minutes} minutes and ${time} seconds, ${message}`
})