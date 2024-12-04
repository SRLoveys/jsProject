/*!
* Start Bootstrap - Full Width Pics v5.0.6 (https://startbootstrap.com/template/full-width-pics)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-full-width-pics/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project
"use strict";

const $ = (selector) => document.querySelector(selector);

let getScore = () => parseInt(localStorage.getItem("totalScore")) || 0;
let getTime = () => parseInt(localStorage.getItem("totalTime"));

const formatTime = (totalSeconds) => {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    return {minutes, seconds};
};

const finalImageAndMessage = (score) => {
    const finalImage = $("#finalImage")
    const finalMessage = $("#finalMessage")

    if (score <= 5) {
        finalMessage.textContent = "Better luck next time!"
        finalImage.src = "../images/gutterGif.gif"
    } else if (score == 6 || score <= 7) {
        finalMessage.textContent = "Good Job!"
        finalImage.src = "../images/sixtySeventyGif.gif"
    } else if (score == 8 || score == 9) {
        finalMessage.textContent = "Amazing!"
        finalImage.src = "../images/soCloseGif.gif"
    } else {
        finalMessage.textContent = "PERFECT SCORE!"
        finalImage.src = "../images/strikeGif.gif"
    }
};

document.addEventListener("DOMContentLoaded", () => {
    $("#aboutPage").addEventListener("click", evt => {
        evt.preventDefault();
        alert("Bowling Trivia website by Sheldon Jacque and Steven Loveys for a JavaScript Project, Goodluck!")
    })

    let score = getScore();
    console.log(score);
    console.log(localStorage.getItem("totalScore"));
    let totalSeconds = getTime();
    let time = formatTime(totalSeconds);

    finalImageAndMessage(score);

    let percentScore = score * 10;

    $("#scoreParagraph").textContent = `You got ${score}/10 (${percentScore}%) correct in ${time.minutes} minute and ${time.seconds} seconds.`
    localStorage.setItem("totalScore", "0");
})