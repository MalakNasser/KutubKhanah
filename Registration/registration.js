let users = [];
let user = {};

const createUser = () => {
  fetch("http://localhost:3000/users", {
    
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user), 
  })
    .then((response) => {
      if (response.ok) {
        console.log("Registration successful!");
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
      console.log(data, "data");
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

    alert("This email already exists");
  } else {
    createUser(newUser);
  }
};

const submit = (user) => {
  getUsersData()
};


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
    const passwordToast = document.getElementById('passwordToast');
    const toastBody= passwordToast.querySelector('.toast-body');
    
  

    

   
    
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !country ||
      !referrer
    ) {
      passwordToast.style.display = "block";
      passwordToast.classList.add('show');
      toastBody.innerHTML ="Please fill out all fields";
      setTimeout(() => {
        passwordToast.classList.remove('show');
        passwordToast.style.display = "none";
      }, 50000); // Hide the toast after 10 seconds
      return;
    }

    if (!passwordRegex.test(password)) {
    
      passwordToast.style.display = "block";
      passwordToast.classList.add('show');
      toastBody.innerHTML = "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character ";

      setTimeout(() => {
        passwordToast.classList.remove('show');
        passwordToast.style.display = "none";
      }, 50000); // Hide the toast after 10 seconds
      return;
    }
   


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

  const closeToast = document.querySelector('[data-dismiss="toast"]');
closeToast.addEventListener("click", () => {
  passwordToast.style.display = "none";
});

});
