const decrementBtn = document.getElementById("decrementBtn");
const incrementBtn = document.getElementById("incrementBtn");
const numberInput = document.getElementById("numberInput");

decrementBtn.addEventListener("click", () => {
  numberInput.value =
    numberInput.value > 0 ? parseInt(numberInput.value) - 1 : 0;
});

incrementBtn.addEventListener("click", () => {
  numberInput.value = parseInt(numberInput.value) + 1;
});

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const bookTitle = urlParams.get("title");
const bookPrice = urlParams.get("price");
const bookImageLink = urlParams.get("imageLink");
const bookCategory = urlParams.get("category");
const bookAuthor = urlParams.get("author");
const bookPages = urlParams.get("pages");
const bookLanguage = urlParams.get("language");

document.getElementById("bookTitle").textContent = bookTitle;
document.getElementById("bookPrice").textContent = bookPrice + "$";
document.getElementById("bookImage").src = bookImageLink;
document.getElementById("bookCategory").textContent = bookCategory;
document.getElementById("bookAuthor").textContent = bookAuthor;
document.getElementById("bookPages").textContent = bookPages+" pages";
document.getElementById("bookLanguage").textContent = bookLanguage;

