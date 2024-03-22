document.addEventListener("DOMContentLoaded", function () {
 
  var parentLocation = window.location.href;
  var navbarLinks = document.querySelectorAll(".navbar-link");
  

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
