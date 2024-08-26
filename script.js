"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// To prevent Browser from remembering scroll position
// if ("scrollRestoration" in history) {
//   history.scrollRestoration = "manual";
// }

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//comment everything after this and uncomment concepts to get a know how of concepts and how everything interactacts with each other

///////////////////////
// Button Scrolling
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

// Page Navigation

// Without event delegation the dirty way of doing it
// document.querySelectorAll(".nav__link").forEach((el) => {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = this.getAttribute("href"); //this.href will return an absolute link we want whatts is ther in the html and thats why this.
//      console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

// I the above exaple we attached an event to every element which is not a good solution, so now we use event delegation for a better approach

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

///////////////////////
//Tabbed Content
tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  // console.log(clicked);

  // Guard Clause
  if (!clicked) return;

  // Remove classes which are already active
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));

  // Activate Tab
  clicked.classList.add("operations__tab--active");

  // Activate Comtent Area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// Menu Fade Animation
const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing (actually assigning 'this' keyword value with bind) 'arguments' into hander
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

// Sticky navigation: Intersection Observer API
// https://www.youtube.com/watch?v=2IbRtjez6ag for more reference
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const headerObserver = new IntersectionObserver(
  (entries) => {
    const [entry] = entries;
    // console.log(entry);
    if (!entry.isIntersecting) {
      nav.classList.add("sticky");
    } else {
      nav.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
  }
);

headerObserver.observe(header);

///////////////////////
// Reveal Section
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.1,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  // section.classList.add("section--hidden");
});

///////////////////////
// Lazy loading images
const imgTargets = document.querySelectorAll("img[data-src]");
// console.log(imgTargets);

const loadImg = function (entries, Observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replacing Src with data-src(Dataset)
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  Observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

///////////////////////
// Slider

const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");

let curSlide = 0;
const maxSlide = slides.length;

const goToSlides = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

const nextSlide = function () {
  if (curSlide === maxSlide - 1) curSlide = 0;
  else curSlide++;

  goToSlides(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) curSlide = maxSlide - 1;
  else curSlide--;

  goToSlides(curSlide);
};

btnLeft.addEventListener("click", prevSlide);
btnRight.addEventListener("click", nextSlide);

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

// // Even Capturing and bubbling
// // Example of arrow implicit and explicit return.
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () => {
//   return `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// };
// // console.log(randomColor());
// // 'this' doesnt work with arrow function hence using a regular function call
// document.querySelector(".nav__link").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("LINK", e.target, e.currentTarget);

//   // To stop propogation
//   // e.stopPropagation();
// });

// document.querySelector(".nav__links").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("CONTAINER", e.target, e.currentTarget);
// });

// // document.querySelector(".nav").addEventListener("click", function (e) {
// //   this.style.backgroundColor = randomColor();
// //   console.log("NAV", e.target, e.currentTarget);
// // }, true);

// document.querySelector(".nav").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("NAV", e.target, e.currentTarget);
// });

// // DOM Traversing

// const h1 = document.querySelector("h1");

// // Going Downward: child
// console.log(h1.querySelectorAll(".highlight"));
// console.log(h1.childNodes);
// console.log(h1.children);
// console.log(h1.childElementCount);
// h1.firstElementChild.style.color = "white";
// h1.lastElementChild.style.color = "orangered";

// // Going Upwards: Parent
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest(".header").style.background = "var(--gradient-secondary)";
// h1.closest("h1").style.background = "var(--gradient-primary)";

// // Going Sideway: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = "scale(0.5)";
// });

// // Sticky navigation
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);

//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// Sticky navigation: Intersection Observer API

// const obsCallback = function (entries, observer) {
//   entries.forEach((entry) => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);
