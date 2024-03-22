document.addEventListener("DOMContentLoaded", function () {
  // Retrieve wishlist items from local storage
  let wishlistItems = JSON.parse(localStorage.getItem("addedToWishlist")) || [];

  // Get the wishlist container
  let wishlistContainer = document.getElementById("wishlistContainer");

  // Display wishlist items
  displayWishlistItems(wishlistItems, wishlistContainer);
});

function displayWishlistItems(items, container) {
  // Clear the existing content of the wishlist container
  container.innerHTML = "";

  // Check if there are items in the wishlist
  if (items.length === 0) {
    container.innerHTML = "<p>Your wishlist is empty</p>";
    return;
  }

  // Loop through each wishlist item and create HTML elements
  items.forEach((item) => {
    // Create a card for each wishlist item
    let card = document.createElement("div");
    card.classList.add(
      "card",
      "mb-3",
      "col-12",
      "col-md-6",
      "col-lg-6",
      "col-xl-6"
    );

    //let cardBody = document.createElement("div");
    card.classList.add(
      "card-text",
      "text-center",
      "d-flex",
      "flex-column",
      "justify-content-between",
      "align-items-center"
    );

    card.innerHTML = `<img src="${item.imageLink}" class="card-img-top" alt="${
      item.title
    }">
    <h6 class="card-title">${item.title}</h6>
    <p class="card-text">${item.author}</p>
    <p class="card-text">${item.category}</p>
    <p class="card-text">$${item.price.toFixed(2)}</p>
    <button class="btn btn-danger btn-sm mt-2">Remove</button>`;

    // Create remove button
    let removeButton = card.querySelector("button.btn-danger");
    removeButton.addEventListener("click", function () {
      // Remove the item from the wishlist and update local storage
      let index = items.indexOf(item);
      if (index !== -1) {
        items.splice(index, 1);
        localStorage.setItem("addedToWishlist", JSON.stringify(items));
        // Refresh the displayed wishlist items
        displayWishlistItems(items, container);
      }
    });

    // Append card body to card
    // card.appendChild(cardBody);

    // Append card to container
    container.appendChild(card);
  });
}
