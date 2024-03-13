let users = [];

const getUsersData = async () => {
  try {
    const response = await fetch("http://localhost:3000/users");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    users = data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const loginUser = (email, password) => {
  const user = users.find((user) => user.email === email && user.password === password);
  if (user) {
    // Redirect to another page
    window.location.href = "another-page.html"; 
  } else {
    const errorMessage =  document.querySelector("#error-login-message");
    errorMessage.style.display = "block";
  }
};

document.addEventListener("DOMContentLoaded", async function () {
  await getUsersData();

  const form = document.querySelector(".formm");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); 

    const email = form.querySelector("#exampleInputEmail").value.trim();
    const password = form.querySelector("#exampleInputPassword").value.trim();

    if (!email || !password) {
      alert("Please fill out all fields");
      return;
    }

    loginUser(email, password);
  });
});
