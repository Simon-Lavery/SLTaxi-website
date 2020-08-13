"use strict";

window.onload = () => {
  const menuButton = document.getElementById("menuButton");
  const nav = document.getElementById("nav");
  const qa = document.getElementsByClassName("qa");
  const callButton = document.getElementsByClassName("call-button")[0];
  let menuOpen = false;

  menuButton.addEventListener("click", function () {
    this.classList.toggle("is-active");
    if (!menuOpen) {
      nav.style.height = "300px";
    } else {
      nav.style.height = 0;
    }
    menuOpen = !menuOpen;
  });

  for (let i = 0; i < qa.length; i++) {
    var q = qa[i];
    q.addEventListener("click", function () {
      this.classList.toggle('hide-answer');
    })
  }

  window.addEventListener("scroll", () => {
    if (menuOpen) {
      menuButton.classList.toggle("is-active");
      nav.style.height = 0;
      menuOpen = false;
    }

  });


}
function closeAlert() {
  document.getElementsByClassName('alert')[0].style.display = "none";
}

function closeBanner() {
  document.getElementsByClassName('banner')[0].style.display = "none";
}



