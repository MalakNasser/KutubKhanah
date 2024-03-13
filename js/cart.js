document.addEventListener("DOMContentLoaded", function () {
  const cartContainer = document.getElementById("cart-container");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const totalDisplay = document.getElementById("totalDisplay");
  const toastContainer = document.getElementById("toastContainer");
  let cartItems = [];

  // Fetch data from books.json (replace with your actual path)
  fetch("../Assets/books.json")
    .then((response) => response.json())
    .then((data) => {
      // Initialize cart with fetched items
      cartItems = data.slice(0, 4).map((item) => ({ ...item, quantity: 1 }));
      displayBooks(cartItems);
      updateTotalDisplay();
    });

  function removeFromCart(event) {
    const bookTitle = event.target.getAttribute("data-book-title");
    const index = cartItems.findIndex((item) => item.title === bookTitle);

    if (index !== -1) {
      cartItems.splice(index, 1);
      // Update the displayed cart and total
      updateCartDisplay();
      updateTotalDisplay();
      showToast("Item removed from the cart", "remove");
    }
  }

  function increaseQuantity(event) {
    const bookTitle = event.target.getAttribute("data-book-title");
    const index = cartItems.findIndex((item) => item.title === bookTitle);

    if (index !== -1) {
      cartItems[index].quantity = (cartItems[index].quantity || 1) + 1;
      updateCartDisplay();
      updateTotalDisplay();
    }
  }

  function decreaseQuantity(event) {
    const bookTitle = event.target.getAttribute("data-book-title");
    const index = cartItems.findIndex((item) => item.title === bookTitle);

    if (index !== -1 && cartItems[index].quantity > 1) {
      cartItems[index].quantity -= 1;
      updateCartDisplay();
      updateTotalDisplay();
    }
  }

  function displayBooks(books) {
    books.forEach((book) => {
      const bookCard = document.createElement("div");
      bookCard.classList.add("card");
      bookCard.innerHTML = `
        <img src="${book.imageLink}" class="card-img-top" alt="${book.title}">
        <div class="card-body">
          <h5 class="card-title">${book.title}</h5>
          <p class="card-text">${book.author}</p>
          <p class="card-text">$${book.price.toFixed(2)}</p>
          <div>
            <label for="quantity-${book.title}">Quantity:</label>
            <input type="number" id="quantity-${book.title}" value="${
        book.quantity
      }" min="1" />
            <button class="btn btn-secondary btn-increase" data-book-title="${
              book.title
            }">+</button>
            <button class="btn btn-secondary btn-decrease" data-book-title="${
              book.title
            }">-</button>
          </div>
          <button class="btn btn-danger btn-remove" data-book-title="${
            book.title
          }">Remove</button>
        </div>
      `;
      cartContainer.appendChild(bookCard);
    });

    // Add event listeners for the "Remove" and quantity change buttons
    const removeButtons = document.querySelectorAll(".btn-remove");
    removeButtons.forEach((button) => {
      button.addEventListener("click", removeFromCart);
    });

    const increaseButtons = document.querySelectorAll(".btn-increase");
    increaseButtons.forEach((button) => {
      button.addEventListener("click", increaseQuantity);
    });

    const decreaseButtons = document.querySelectorAll(".btn-decrease");
    decreaseButtons.forEach((button) => {
      button.addEventListener("click", decreaseQuantity);
    });
  }

  // Function to update the displayed cart
  function updateCartDisplay() {
    // Clear the current cart display
    cartContainer.innerHTML = "";
    // Redisplay the books in the cart
    displayBooks(cartItems);
  }

  // Function to calculate and update the total display
  function updateTotalDisplay() {
    const totalPrice = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    totalDisplay.innerText = `Total: $${totalPrice.toFixed(2)}`;
  }

  // Function to show toasts
  function showToast(message, action) {
    const toast = document.createElement("div");
    toast.classList.add("toast", "fade", "show"); // Add Bootstrap classes for styling
    toast.setAttribute("role", "alert");
    toast.setAttribute("aria-live", "assertive");
    toast.setAttribute("aria-atomic", "true");

    let backgroundColor, headerColor;

    switch (action) {
      case "remove":
        backgroundColor = "#ff0000";
        headerColor = "#ae1f1f";
        break;
      case "checkout":
        backgroundColor = "#28a745";
        headerColor = "#218838";
        break;
      case "submitOrder":
        backgroundColor = "#007bff";
        headerColor = "#0056b3";
        break;
      default:
        backgroundColor = "#007bff";
        headerColor = "#0056b3";
    }

    toast.style.backgroundColor = backgroundColor;

    toast.innerHTML = `
      <div class="toast-header" style="background-color: ${headerColor};">
        <p class="mr-auto">Notification</p>
      </div>
      <div class="toast-body">
        ${message}
      </div>
    `;

    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 2000);
  }

  checkoutBtn.addEventListener("click", () => {
    // Display the checkout form
    document.getElementById("checkoutForm").style.display = "block";
    showToast("Proceeding to checkout", "checkout");
  });

  // Regular expressions for validation
  const nameRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const addressRegex = /^[A-Za-z0-9\s]+$/;
  const cityRegex = /^[A-Za-z\s]+$/;
  const zipRegex = /^\d{5}$/;
  const cardNumberRegex = /^\d{16}$/;
  const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  const cvvRegex = /^\d{3}$/;

  // Function to validate form input
  function validateInput(input, regex) {
    return regex.test(input);
  }

  // Move to the Address form
  document.getElementById("nextToAddress").addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    if (!validateInput(name, nameRegex) || !validateInput(email, emailRegex)) {
      showToast("Please enter valid Name and Email.", "remove");
      return;
    }

    document.getElementById("personalForm").style.display = "none";
    document.getElementById("addressForm").style.display = "block";
    showToast("Proceeding to address information", "checkout");
  });

  // Move to the Payment form
  document.getElementById("nextToPayment").addEventListener("click", () => {
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const zip = document.getElementById("zip").value;

    if (
      !validateInput(address, addressRegex) ||
      !validateInput(city, cityRegex) ||
      !validateInput(zip, zipRegex)
    ) {
      showToast("Please enter valid Address, City, and ZIP Code.", "remove");

      return;
    }

    document.getElementById("addressForm").style.display = "none";
    document.getElementById("paymentForm").style.display = "block";
    showToast("Proceeding to payment information", "checkout");
  });

  // Handle order submission (you may want to implement server-side processing)
  document.getElementById("submitOrder").addEventListener("click", () => {
    const cardNumber = document.getElementById("cardNumber").value;
    const expiryDate = document.getElementById("expiryDate").value;
    const cvv = document.getElementById("cvv").value;

    if (
      !validateInput(cardNumber, cardNumberRegex) ||
      !validateInput(expiryDate, expiryDateRegex) ||
      !validateInput(cvv, cvvRegex)
    ) {
      showToast("Please enter valid Card Information.", "remove");

      return;
    }

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const zip = document.getElementById("zip").value;

    const orderData = {
      personalInfo: { name, email },
      shippingAddress: { address, city, zip },
      paymentInfo: { cardNumber, expiryDate, cvv },
      cartItems: cartItems,
    };

    console.log("Order submitted:", orderData);
    showToast("Order submitted successfully.", "submitOrder");
  });
});
