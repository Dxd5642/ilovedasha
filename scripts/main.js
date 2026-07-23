window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');

  setTimeout(() => {
    preloader.classList.add('hidden');
    document.body.classList.remove('loading');
    
    setTimeout(() => {
      preloader.remove();
    }, 500);
  }, 300);
});

import * as timer from "./timer.js"
timer.updateCountdown()
setInterval(timer.updateCountdown, 1000) 

import * as menu from "./menu.js"
import * as monya from "./monya.js"
import * as mouth1 from "./mouth1.js"



document.addEventListener('DOMContentLoaded', () => {
    timer.initMainBlock()
    menu.initMenu()
    mouth1.initMouth1()
    monya.initMonya()
});