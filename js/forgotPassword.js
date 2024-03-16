const updateUser = async (user) => {
  console.log(user, "user");
  try {
    const response = await fetch(`http://localhost:3000/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      console.log("user updated successfully");

      window.location.href = "/pages/login.html";
    }
    if (!response.ok) {
      throw new Error("failed to update user");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const updatePassword = (user, password) => {

  const newUser = {
    ...user[0],
    password: password,
  };
  updateUser(newUser);
};

const findUserByEmail = async (email, newPass) => {
  try {
    const response = await fetch(`http://localhost:3000/users?email=${email}`);
    if (response.ok) {
      const userByEmail = await response.json();

      if (!userByEmail.length) {
        showToast("This email does not exist");
      } else {
        updatePassword(userByEmail, newPass);
      }
    }
  } catch (error) {
    console.error("error:", error);
  }
};

function showToast(message) {
  const passwordToast = document.getElementById("passwordToast");
  const toastBody = passwordToast.querySelector(".toast-body");

  window.scrollTo({ top: 0, behavior: "smooth" });

  passwordToast.style.display = "block";
  passwordToast.classList.add("show");
  toastBody.innerHTML = message;

  var scrollY =
    window.scrollY ||
    window.scrollTo({ top: 0, behavior: "smooth" }) ||
    document.documentElement.scrollTop;
  var topPosition = Math.max(20, scrollY + 20);

  passwordToast.style.top = topPosition + "px";

  setTimeout(() => {
    passwordToast.classList.remove("show");
    passwordToast.style.display = "none";
  }, 5000);

  const closeToast = document.querySelector('[data-dismiss="toast"]');
  closeToast.addEventListener("click", () => {
    passwordToast.style.display = "none";
  });
}

document.addEventListener("DOMContentLoaded", async function () {
  const form = document.querySelector(".formm");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = form.querySelector("#exampleInputEmail").value.trim();
    const newPass = form.querySelector("#newPassword").value;
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
    const passwordToast = document.getElementById("passwordToast");
    const toastBody = passwordToast.querySelector(".toast-body");

    if (!email || !newPass) {
      showToast("Please fill out all fields");
      return;
    }

    if (!passwordRegex.test(newPass)) {
      showToast(
        "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
      return;
    }

    findUserByEmail(email, newPass);
  });
});
