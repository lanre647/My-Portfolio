/**
 * Page loader
 */
window.addEventListener("load", () => {
  // --------------------------- page loader --------------------------------------------
  document.querySelector(".page-loader").classList.add("slide-out-right");
  setTimeout(() => {
    document.querySelector(".page-loader").style.display = "none";
  }, 1000);
});

/**
 * add event on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

/**
 * Element tilt effect
 */

const tiltElements = document.querySelectorAll("[data-tilt]");

const initTilt = function (event) {
  /** get tilt element center position */
  const centerX = this.offsetWidth / 2;
  const centerY = this.offsetHeight / 2;

  const tiltPosY = ((event.offsetX - centerX) / centerX) * 10;
  const tiltPosX = ((event.offsetY - centerY) / centerY) * 10;

  this.style.transform = `perspective(1000px) rotateX(${tiltPosX}deg) rotateY(${
    tiltPosY - tiltPosY * 2
  }deg)`;
};

addEventOnElements(tiltElements, "mousemove", initTilt);

addEventOnElements(tiltElements, "mouseout", function () {
  this.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
});

/**
 * Circle text
 */
const container = document.getElementById("circle-text-container");
const text = "///DESIGN GOES BEYOND SREENS"; // Longer text to display
const radius = 50; // Radius of the circle
const angleIncrement = (2 * Math.PI) / text.length; // Angle between each character

for (let i = 0; i < text.length; i++) {
  const angle = i * angleIncrement;
  const x = Math.round(radius * Math.cos(angle));
  const y = Math.round(radius * Math.sin(angle));

  const character = document.createElement("div");
  character.textContent = text[i];
  character.classList.add("character");
  character.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${
    angle + Math.PI / 2
  }rad)`;
  container.appendChild(character);
}

/**
 * About tabs
 */
var tabLinks = document.getElementsByClassName("tab_links");
var tabContents = document.getElementsByClassName("tab_contents");

function opentab(tabname) {
  for (tabLink of tabLinks) {
    tabLink.classList.remove("active_link");
  }
  for (tabContent of tabContents) {
    tabContent.classList.remove("active_tab");
  }
  event.target.classList.add("active_link");
  document.getElementById(tabname).classList.add("active_tab");
}

/**
 * mobile nav
 */
let mmenu = document.getElementById("menu-btn");
let menuNav = document.querySelector(".main-nav-list");
let navlinks = document.querySelectorAll(".main-nav-list li a");

navlinks.forEach((link) => {
  link.onclick = function () {
    mmenu.classList.toggle("activem");
    menuNav.classList.toggle("activen");
    if (document.body.classList.contains("actives")) {
      document.body.classList.remove("actives");
    }
  };
});

function toggleMenu() {
  document.body.classList.toggle("actives");
  menuNav.classList.toggle("activen");
  mmenu.classList.toggle("activem");
}

// mmenu.addEventListener("click", toggleMenu);

/**
 * Reveal header on scroll
 */

const body = document.body;
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll <= 0) {
    body.classList.remove("scroll-up");
    return;
  }

  if (currentScroll > lastScroll && !body.classList.contains("scroll-down")) {
    body.classList.remove("scroll-up");
    body.classList.add("scroll-down");
  } else if (
    currentScroll < lastScroll &&
    body.classList.contains("scroll-down")
  ) {
    body.classList.remove("scroll-down");
    body.classList.add("scroll-up");
  }
  lastScroll = currentScroll;
});

/**
 * Light and dark mode
 */

let btn = document.querySelector("#togglebtn");
let logo = document.querySelector(".logo");
let map = document.querySelector(".map");

btn.onclick = function () {
  document.body.classList.toggle("light-theme");

  if (document.body.classList.contains("light-theme")) {
    btn.src = "assets/moon.png";
    btn.classList.add("dark");
    logo.classList.add("dark");
    map.classList.remove("dark");
  } else {
    btn.src = "assets/sun.png";
    btn.classList.remove("dark");
    logo.classList.remove("dark");
    map.classList.add("dark");
  }
};

/**
 * detect light mode
 */
const lightThemeMq = window.matchMedia("(prefers-color-scheme: light)");
const mqCallback = (mq) => {
  if (mq.matches) {
    // console.log("l");
    document.body.classList.add("light-theme");
    btn.src = "assets/moon.png";
    btn.classList.add("dark");
    logo.classList.add("dark");
    map.classList.remove("dark");
  } else {
    // console.log("d");
    document.body.classList.remove("light-theme");
    btn.src = "assets/sun.png";
    btn.classList.remove("dark");
    logo.classList.remove("dark");
    map.classList.add("dark");
  }
};

lightThemeMq.addListener(mqCallback);
mqCallback(lightThemeMq);

/**
 * Copyright footer
 */

let year = document.querySelector("#current-year");
year.innerHTML = new Date().getFullYear();

/**
 * Back to top button
 */

const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  const bodyHeight = document.body.scrollHeight;
  const windowHeight = window.innerHeight;
  const scrollEndPos = bodyHeight - windowHeight;
  const totalScrollPercent = (window.scrollY / scrollEndPos) * 100;

  backTopBtn.textContent = `${totalScrollPercent.toFixed(0)}%`;

  // visible back top btn when scrolled 5% of the page
  if (totalScrollPercent > 5) {
    backTopBtn.classList.add("show");
  } else {
    backTopBtn.classList.remove("show");
  }
});

/**
 * Custom cursor
 */

const cursors = document.querySelectorAll("[data-cursor]");
const hoveredElements = [
  ...document.querySelectorAll("button"),
  ...document.querySelectorAll("a"),
];

window.addEventListener("mousemove", function (event) {
  const posX = event.clientX;
  const posY = event.clientY;

  /** cursor dot position */
  cursors[0].style.left = `${posX}px`;
  cursors[0].style.top = `${posY}px`;

  /** cursor outline position */
  setTimeout(function () {
    cursors[1].style.left = `${posX}px`;
    cursors[1].style.top = `${posY}px`;
  }, 80);
});

/** add hovered class when mouseover on hoverElements */
addEventOnElements(hoveredElements, "mouseover", function () {
  for (let i = 0, len = cursors.length; i < len; i++) {
    cursors[i].classList.add("hovered");
  }
});

/** remove hovered class when mouseout on hoverElements */
addEventOnElements(hoveredElements, "mouseout", function () {
  for (let i = 0, len = cursors.length; i < len; i++) {
    cursors[i].classList.remove("hovered");
  }
});

/**
 * Active nav link on scroll
 */

let sections = document.querySelectorAll("section");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navlinks.forEach((link) => {
        link.classList.remove("active");
      });

      // Find the corresponding navigation link and add the active class
      document
        .querySelector(`.main-nav-list li a[href="#${id}"]`)
        .classList.add("active");
    }
  });
};

/**
 * Email js: working email form
 */
const contactForm = document.getElementById("contact-form"),
  contactName = document.getElementById("contact-name"),
  contactEmail = document.getElementById("contact-email"),
  contactMessage = document.getElementById("contact-message"),
  contactFeedBack = document.querySelector("form small");

const sendEmail = (e) => {
  e.preventDefault();

  if (
    contactName.value === "" ||
    contactEmail.value === "" ||
    contactMessage.value === ""
  ) {
    contactFeedBack.classList.remove("color-accent");
    contactFeedBack.classList.add("color-red");

    contactFeedBack.innerHTML = "⚠ Fill all input fields";
  } else {
    //serviceID,templateID,#form,publicKey
    emailjs
      .sendForm(
        "service_53o2yvv",
        "template_fm92pa8",
        "#contact-form",
        "oOu6n9ucxSh2UN6xm"
      )
      .then(
        () => {
          contactFeedBack.classList.add("color-accent");
          contactFeedBack.innerHTML = "Message sent ✅";

          setTimeout(() => {
            contactFeedBack.innerHTML = "";
          }, 5000);
        },
        (error) => {
          alert("OOPS! SOMETHING HAS FAILED...", error);
        }
      );
  }

  contactName.value = "";
  contactEmail.value = "";
  contactMessage.value = "";
};

contactForm.addEventListener("submit", sendEmail);

/**
 * SCROLL REVEAL
 */

const revealElements = document.querySelectorAll("[data-reveal]");
const revealDelayElements = document.querySelectorAll("[data-reveal-delay]");

const reveal = function () {
  for (let i = 0, len = revealElements.length; i < len; i++) {
    if (
      revealElements[i].getBoundingClientRect().top <
      window.innerHeight / 1.2
    ) {
      revealElements[i].classList.add("revealed");
    }
  }
};

for (let i = 0, len = revealDelayElements.length; i < len; i++) {
  revealDelayElements[i].style.transitionDelay =
    revealDelayElements[i].dataset.revealDelay;
}

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);
