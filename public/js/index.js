"use strict";

window.onload = () => {
  const menuButton = document.getElementById("menuButton");
  const menu = document.getElementById("menu");
  const qa = document.getElementsByClassName("qa");
  const callButton = document.getElementsByClassName("call-button")[0];
  let menuOpen = false;

  menuButton.addEventListener("click", function () {
    this.classList.toggle("is-active");
    if (!menuOpen) {
      menu.style.height = "300px";
    } else {
      menu.style.height = 0;
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
      menu.style.height = 0;
      menuOpen = false;
    }
    let banner = document.getElementsByClassName('banner')[0];
    if (banner) {
      banner.style.display = 'none';
    }
  });

  setTimeout(() => {
    if (window.outerWidth < 790) {
      callButton.classList.add('call-button_shrink');
    }

  }, 3000)


}

function closeAlert() {
  document.getElementsByClassName('alert')[0].style.display = "none";
}

function closeBanner() {
  document.getElementsByClassName('banner')[0].style.display = "none";
}



