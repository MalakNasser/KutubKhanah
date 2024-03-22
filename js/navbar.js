document.addEventListener("DOMContentLoaded", function () {

  var isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  var logoutBtn = document.querySelector(".btn-logout"); 


  var parentLocation = window.location.href;
  var navbarLinks = document.querySelectorAll(".navbar-link");
  var indexLink = document.querySelector('.navbar-link[href="../index.html"]');
  var signUpBtn = document.querySelector(".btn-dark");
  var signInBtn = document.querySelector(".btn-outline-dark");

  
  const hideButtons = () => {
    signUpBtn.style.display = "none";
    signInBtn.style.display = "none";
    logoutBtn.style.display = "block"; 
  };

 
  const showButtons = () => {
    signUpBtn.style.display = "block";
    signInBtn.style.display = "block";
    logoutBtn.style.display = "none"; 
  };

  
  if (isLoggedIn) {
    hideButtons();
  } else {
    showButtons();
    window.parent.location.href = "../pages/login.html";

  }

  logoutBtn.addEventListener("click", () => { 
    localStorage.removeItem('loggedIn'); 
    window.parent.location.href = "../pages/login.html"; 
  });


  signUpBtn.addEventListener("click", () => {
    try {
      window.parent.location.href = "../pages/registration.html";
    } catch (e) {
      window.location.href = "../pages/registration.html";
    }
  });

  signInBtn.addEventListener("click", () => {
    try {
      window.parent.location.href = "../pages/login.html";
    } catch (e) {
      window.location.href = "../pages/login.html";
    }
  });

  navbarLinks.forEach(function (link) {
    var linkPath = link.getAttribute("href");
    if (parentLocation.endsWith(linkPath)) {
      link.classList.add("active");
    }
  });

  navbarLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      var targetUrl = link.getAttribute("href");
      try {
        window.parent.location.href = targetUrl;
      } catch (e) {
        window.location.href = targetUrl;
      }
    });
  });
 
});
