function showToast(message) {
    const passwordToast = document.getElementById('passwordToast');
    const toastBody= passwordToast.querySelector('.toast-body');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  
    passwordToast.style.display = "block";
    passwordToast.classList.add('show');
    toastBody.innerHTML = message;
  
    var scrollY = window.scrollY || window.scrollTo({ top: 0, behavior: 'smooth' }) || document.documentElement.scrollTop;
    var topPosition = Math.max(20, scrollY + 20); 
  
    passwordToast.style.top = topPosition + 'px';
  
    setTimeout(() => {
        passwordToast.classList.remove('show');
        passwordToast.style.display = "none";
    }, 8000); 
  
    const closeToast = document.querySelector('[data-dismiss="toast"]');
    closeToast.addEventListener("click", () => {
      passwordToast.style.display = "none";
    });
  }



document.addEventListener("DOMContentLoaded", async function () {

const form = document.querySelector(".contactForm");
const sendMessageBtn = form.querySelector(".send-message");
if (sendMessageBtn) {
    sendMessageBtn.addEventListener("click", function(event) {

        event.preventDefault();

        const name = form.querySelector(".form-name").value;
        const email = form.querySelector(".form-email").value;
        const subject = form.querySelector(".form-subject").value;
        const message = form.querySelector(".form-message").value;
        const header = form.querySelector(".mr-auto");
       
        if (
            !name ||
            !message ||
            !email ||
            !subject
          ) {
            showToast("Please fill out all fields");
            return;
          }else{
        form.querySelector(".form-name").value = "";
        form.querySelector(".form-email").value = "";
        form.querySelector(".form-subject").value = "";
        form.querySelector(".form-message").value = "";
        showToast("We Have Received Your Message. Thank You!");
       

        }
    });
} else {
    console.error("Send message button not found.");
}


});