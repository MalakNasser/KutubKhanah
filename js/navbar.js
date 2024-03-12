document.addEventListener("DOMContentLoaded", function() {
    var parentLocation = window.parent.location.pathname;
    var navbarLinks = document.querySelectorAll('.navbar-link');
  
    navbarLinks.forEach(function(link) {
      var linkPath = link.getAttribute('href');
      var indexLink = document.querySelector('.navbar-link[href="../index.html"]');
      if (parentLocation.endsWith('/index.html') || parentLocation === '/') {
        indexLink.classList.add('active');
      }
      else if (linkPath.endsWith(parentLocation)) {
        link.classList.add('active');
      }
    });
  
    navbarLinks.forEach(function(link) {
      link.addEventListener('click', function(event) {
        event.preventDefault();
  
        var targetUrl = link.getAttribute('href');
        window.parent.location.href = targetUrl;
      });
    });
  });
  