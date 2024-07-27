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

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

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

const header = document.querySelector(".header");
const allSections = document.querySelectorAll(".section");
console.log(allSections);

//getElementsByTagName and ClassName are dynamic and changes with the html frontend queryselector are static and values once assigned can only be modified manually or with user code intervention. queryselector returns a nodlist, getElementsByTagName/className returns a HTMLCollection

document.getElementById("section--1");
const allButtons = document.getElementsByTagName("button");
console.log(allButtons);

console.log(document.getElementsByClassName("btn"));

//Creating and inserting Elements
//Check bank-webapp for insertadjacentHtml

const message = document.createElement("div");
message.classList.add("cookie-message");
// message.textContent = "We use cookies for improved functionality and analytics";
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class = "btn btn--close--cookie">Got it!</button>';

//append is at the end of the element but still within it, prepend is at the start of of the element while still being a child not sibling
// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));

//before is before the element in a sibling relation to the element, after is after the element again in sibling relation
// header.before(message);
// header.before(message.cloneNode(true));
// header.after(message);

//Delete Elements
document.querySelector(".btn--close--cookie").addEventListener("click", () => {
  //.remove() is relatively new to js, and is still less used
  message.remove();

  //old way of achieving what .remove() accomplishes
  //This is called DOM traversing
  // message.parentElement.removeChild(message);
});
