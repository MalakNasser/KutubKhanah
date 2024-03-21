const decrementBtn = document.getElementById("decrementBtn");
const incrementBtn = document.getElementById("incrementBtn");
const numberInput = document.getElementById("numberInput");

decrementBtn.addEventListener("click", () => {
  numberInput.value =
    numberInput.value > 1 ? parseInt(numberInput.value) - 1 : 1;
});

incrementBtn.addEventListener("click", () => {
  numberInput.value = parseInt(numberInput.value) + 1;
});

const bookDetailsString = localStorage.getItem("bookDetails");
const bookDetails = JSON.parse(bookDetailsString);

if (bookDetails) {
  const { title, price, imageLink, category, author, pages, language } =
    bookDetails;

  document.getElementById("bookTitle").textContent = title;
  document.getElementById("bookPrice").textContent = price + "$";
  document.getElementById("bookImage").src = imageLink;
  document.getElementById("bookCategory").textContent = category;
  document.getElementById("bookAuthor").textContent = author;
  document.getElementById("bookPages").textContent = pages + " pages";
  document.getElementById("bookLanguage").textContent = language;
} else {
  console.error("Book details not found in localStorage");
}

function addToCart() {
  let addedToCart = JSON.parse(localStorage.getItem("addedToCart")) || [];
  const existingItem = addedToCart.find(
    (cartItem) => cartItem.title === bookDetails.title
  );
  if (existingItem) {
    existingItem.quantity += parseInt(numberInput.value);
  } else {
    addedToCart.push({ ...bookDetails, quantity: parseInt(numberInput.value) });
  }
  localStorage.setItem("addedToCart", JSON.stringify(addedToCart));
  console.log(localStorage.getItem("addedToCart"));
  setTimeout(function () {
    window.location.href = "../pages/Cart.html";
  }, 1000);
}

function checkWishlist() {
  let addedToWishlist = JSON.parse(localStorage.getItem("addedToWishlist")) || [];
  const existingItemIndex = addedToWishlist.findIndex(
    (wishlistItem) => wishlistItem.title === bookDetails.title
  );

  const wishlistButton = document.querySelector(".text");

  if (existingItemIndex === -1) {
    wishlistButton.textContent = "Add to Wishlist";
  } else {
    wishlistButton.textContent = "Remove from Wishlist";
  }
}

function addToWishlist() {
  let addedToWishlist = JSON.parse(localStorage.getItem("addedToWishlist")) || [];
  const existingItemIndex = addedToWishlist.findIndex(
    (wishlistItem) => wishlistItem.title === bookDetails.title
  );

  if (existingItemIndex === -1) {
    addedToWishlist.push({ ...bookDetails });
  } else {
    addedToWishlist.splice(existingItemIndex, 1);
  }

  localStorage.setItem("addedToWishlist", JSON.stringify(addedToWishlist));
  console.log(localStorage.getItem("addedToWishlist"));

  checkWishlist();
}

window.addEventListener('DOMContentLoaded', checkWishlist);
