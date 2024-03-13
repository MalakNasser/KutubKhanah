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
        alert("Registration successful!");
      } else {
        alert("Failed to register. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while registering. Please try again later.");
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
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !country ||
      !referrer
    ) {
      alert("Please fill out all fields");
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
});
