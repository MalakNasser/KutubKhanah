document.addEventListener("DOMContentLoaded", function () {
    var links=document.querySelectorAll(".links");

    links.forEach(function(link){
        link.addEventListener("click", function(event){
            event.preventDefault();
            var targetUrl=link.getAttribute("href");
            try{
                window.parent.location.href=targetUrl;
            }catch(e){
                window.location.href=targetUrl;
            }
        })
    })
});
