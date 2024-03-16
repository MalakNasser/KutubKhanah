let users = [];
let user = {};

const createUser = () => {
  const newUserId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
  const newUser = { id: newUserId, ...user };

  fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser), 
  })
    .then((response) => {
      if (response.ok) {
        console.log("Registration successful!");
        window.location.href="/pages/login.html";
      } else {
        console.log("Failed to register. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      console.log("An error occurred while registering. Please try again later.");
    });
};

const getUsersData = async () => {
  fetch("http://localhost:3000/users") 
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    })
    .then((data) => {
      users = data;
      validateUser(user)
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const validateUser = function (newUser) {
  let isEmailExist = false;
  if (users.length) {
    users.forEach((user) => {
      if (newUser.email === user.email) {
        isEmailExist = true;

      }
    });
  }
  if (isEmailExist == true) {

    // alert("This email already exists");
    showToast("This email is already registered");
  } else {
    createUser(newUser);
  }
};

const submit = (user) => {
  getUsersData()
};

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
  }, 5000); 

  const closeToast = document.querySelector('[data-dismiss="toast"]');
  closeToast.addEventListener("click", () => {
    passwordToast.style.display = "none";
  });
}


document.addEventListener("DOMContentLoaded", function () {
const form = document.querySelector(".formm");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); 

    const firstName = form.querySelector("#exampleInputFirstName").value;
    const lastName = form.querySelector("#exampleInputLastName").value;
    const email = form.querySelector("#exampleInputEmail").value.trim();
    const password = form.querySelector("#exampleInputPassword").value.trim();
    const country = form.querySelector("#inputGroupSelectCountry").value;
    const referrer = form.querySelector("#inputGroupSelectReferrer").value;

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
    // const passwordToast = document.getElementById('passwordToast');
    // const toastBody= passwordToast.querySelector('.toast-body');

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !country ||
      !referrer
    ) {
      showToast("Please fill out all fields");
      return;
    }

    if (!passwordRegex.test(password)) {
      showToast("Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character");
      return;
    }

    // if (isEmailExist == true) {
    //   showToast("This email is already registered");
    // }
    


  
  

 


     user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      country: country,
      referrer: referrer,
    };
    submit(user);

  

  });



});
