document.addEventListener("DOMContentLoaded", function () {
  var isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  var logoutBtn = document.querySelector(".btn-logout");
  var signUpBtn = document.querySelector(".btn-dark");
  var signInBtn = document.querySelector(".btn-outline-dark");

  const hideButtons = () => {
    if (signUpBtn) signUpBtn.style.display = "none";
    if (signInBtn) signInBtn.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "block";
  };

  const showButtons = () => {
    if (signUpBtn) signUpBtn.style.display = "block";
    if (signInBtn) signInBtn.style.display = "block";
    if (logoutBtn) logoutBtn.style.display = "none";
  };

  if (isLoggedIn) {
    hideButtons();
  } else {
    showButtons();
    window.parent.location.href = "../pages/login.html";
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem('loggedIn');
      window.parent.location.href = "../pages/login.html";
    });
  }

  if (signUpBtn) {
    signUpBtn.addEventListener("click", () => {
      try {
        window.parent.location.href = "../pages/registration.html";
      } catch (e) {
        window.location.href = "../pages/registration.html";
      }
    });
  }

  if (signInBtn) {
    signInBtn.addEventListener("click", () => {
      try {
        window.parent.location.href = "../pages/login.html";
      } catch (e) {
        window.location.href = "../pages/login.html";
      }
    });
  }

});
