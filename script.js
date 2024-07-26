"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) =>
  btn.addEventListener("click", openModal)
);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});


//////////////////////////////
//////////////////////////////
//////////////////////////////

console.log(document.doctype);
console.log(document.documentElement);
console.log(document.head);
console.log(document.baseURI);
console.log(document.body);

//Selecting Elements

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

//getElementsByTagName and ClassName are dynamic and changes with the html frontend queryselector are static and values once assigned can only be modified manually or with user code intervention. queryselector returns a nodlist, getElementsByTagName/className returns a HTMLCollection

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

