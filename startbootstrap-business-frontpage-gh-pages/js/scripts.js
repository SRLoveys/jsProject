/*!
* Start Bootstrap - Business Frontpage v5.0.9 (https://startbootstrap.com/template/business-frontpage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-business-frontpage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project
"use strict";

const $ = (selector) => document.querySelector(selector);

document.addEventListener("DOMContentLoaded", () => {
    $("#aboutPage").addEventListener("click", evt => {
        evt.preventDefault();
        alert("Bowling Trivia website by Sheldon Jacque and Steven Loveys for a JavaScript Project, Goodluck!")
    })
})