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

//comment everything after this and uncomment concepts to get a know how of concepts and how everything interactacts with each other

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", (e) => {
  const s1coords = section1.getBoundingClientRect();

  console.log(e.target.getBoundingClientRect());
  console.log(s1coords);

  // How much we scrolled this is how we get it
  // Old way of doing it
  // console.log("Current scroll for X/Y", window.pageXOffset, window.pageYOffset);
  console.log("Current scroll for X/Y", window.scrollX, window.scrollY);

  // To get height and width of the viewport, this ignores scrollbar
  console.log(
    "Heigt/Width of the viewport",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling Implementation that supports legacy browsers but is not smooth
  // Bad way of implementing this, since the scrolled distance is not taken into account
  // window.scrollTo(s1coords.left, s1coords.top);

  // Correct way to do this without smooothness
  // window.scrollTo(
  //   s1coords.left + window.scrollX,
  //   s1coords.top + window.scrollY
  // );

  // Smooth Scrollinng implementation
  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: "smooth",
  // });

  // Smooth scrolling for relatively newer browsers
  section1.scrollIntoView({ behavior: "smooth" });
});

// /////////////////////
// //Concepts
// /////////////////////

// //////////////////////////////
// //////////////////////////////
// //////////////////////////////

// console.log(document.doctype);
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.baseURI);
// console.log(document.body);

// //Selecting Elements

// const header = document.querySelector(".header");
// const allSections = document.querySelectorAll(".section");
// console.log(allSections);

// //getElementsByTagName and ClassName are dynamic and changes with the html frontend queryselector are static and values once assigned can only be modified manually or with user code intervention. queryselector returns a nodlist, getElementsByTagName/className returns a HTMLCollection

// document.getElementById("section--1");
// const allButtons = document.getElementsByTagName("button");
// console.log(allButtons);

// console.log(document.getElementsByClassName("btn"));

// //Creating and inserting Elements
// //Check bank-webapp for insertadjacentHtml

// const message = document.createElement("div");
// message.classList.add("cookie-message");
// // message.textContent = "We use cookies for improved functionality and analytics";
// message.innerHTML =
//   'We use cookies for improved functionality and analytics. <button class = "btn btn--close--cookie">Got it!</button>';

// //append is at the end of the element but still within it, prepend is at the start of of the element while still being a child not sibling
// // header.prepend(message);
// header.append(message);
// // header.append(message.cloneNode(true));

// //before is before the element in a sibling relation to the element, after is after the element again in sibling relation
// // header.before(message);
// // header.before(message.cloneNode(true));
// // header.after(message);

// //Delete Elements
// document.querySelector(".btn--close--cookie").addEventListener("click", () => {
//   //.remove() is relatively new to js, and is still less used
//   message.remove();

//   //old way of achieving what .remove() accomplishes
//   //This is called DOM traversing
//   // message.parentElement.removeChild(message);
// });

// //Styles
// message.style.backgroundColor = "#37383d";
// message.style.width = "99vw";

// //we can only get styles that we have set, everything else will show up blank
// console.log(message.style.color);
// console.log(message.style.backgroundColor);

// //If we want to get css values of computed style from anywhere else then the js we have set it to\
// console.log(getComputedStyle(message)); //will show all the styles applied to the elemenet
// //To know the exact style applied to an element
// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

// document.documentElement.style.setProperty("--color-primary", "orangered");

// //Attributes
// const logo = document.querySelector(".nav__logo");
// //JS automatically createes standard properties of an element as an object and assigns values
// console.log(logo.alt);
// console.log(logo.className);
// logo.alt = "Beautiful minimalist logo";
// console.log(logo.alt);

// //For Non-Standard properties
// console.log(logo.designer); //Returns undefined because this is not a standard HTML attribute
// console.log(logo.getAttribute("designer"));
// logo.setAttribute("company", "S3CR8");
// console.log(logo.getAttribute("company"));

// //Absolute and relative version of the properties.
// console.log(logo.src); //This is the absolute path as in url/img
// console.log(logo.getAttribute("src")); //This is the relative path as defined in gypertext
// const link = document.querySelector(".nav__link--btn");
// console.log(link.href);
// console.log(link.getAttribute("href"));

// //Data Attributes, used to store data in user interface(HTML code), used a lot in UI, always start with data
// console.log(logo.dataset.versionNumber); //Here the data attribute property shoudl be declared with camelcase, unlike HTML

// //Classes
// //Fake class names used here for example, we ca pass as many as we want
// logo.classList.add("c", "j");
// logo.classList.add("k");
// logo.classList.remove("c");
// logo.classList.remove("k", "j");
// logo.classList.toggle("c");
// logo.classList.contains("c");

// //Dont use
// //This will overwrite all the classes in that element and rewrite it to just the ones defined here
// logo.className = "Jonas";
