document.addEventListener('DOMContentLoaded', function () {
  // Retrieve wishlist items from local storage
  let wishlistItems = JSON.parse(localStorage.getItem('addedToWishlist')) || [];

  // Get the wishlist container
  let wishlistContainer = document.getElementById('wishlistContainer');

  // Display wishlist items
  displayWishlistItems(wishlistItems, wishlistContainer);
});

function displayWishlistItems(items, container) {
  console.log(items);
  // Clear the existing content of the wishlist container
  container.innerHTML = '';

  // Check if there are items in the wishlist
  if (items.length === 0) {
      container.innerHTML = '<p>Your wishlist is empty</p>';
      return;
  }

  // Loop through each wishlist item and create HTML elements
  items.forEach(item => {
      // Create a card for each wishlist item
      let card = document.createElement('div');
      card.classList.add('card', 'mb-3');

      // Create card body
      let cardBody = document.createElement('div');
      cardBody.classList.add('card-body');

      // Set card title
      let cardTitle = document.createElement('h5');
      cardTitle.classList.add('card-title');
      cardTitle.textContent = item.title;

      let cardText = document.createElement('p');
      cardText.classList.add('card-text');
      cardText.innerHTML = `<strong>Author:</strong> ${item.author}<br>
                            <strong>Country:</strong> ${item.country}<br>
                            <strong>Image Link:</strong> <a href="${item.imageLink}" target="_blank">${item.imageLink}</a><br>
                            <strong>Language:</strong> ${item.language}<br>
                            <strong>Link:</strong> <a href="${item.link}" target="_blank">${item.link}</a><br>
                            <strong>Pages:</strong> ${item.pages}<br>
                            <strong>Title:</strong> ${item.title}<br>
                            <strong>Year:</strong> ${item.year}<br>
                            <strong>Price:</strong> $${item.price}<br>
                            <strong>Category:</strong> ${item.category}`;

      // Create remove button
      let removeButton = document.createElement('button');
      removeButton.classList.add('btn', 'btn-danger', 'btn-sm', 'mt-2');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', function () {
          // Remove the item from the wishlist and update local storage
          let index = items.indexOf(item);
          if (index !== -1) {
              items.splice(index, 1);
              localStorage.setItem('wishlist', JSON.stringify(items));
              // Refresh the displayed wishlist items
              displayWishlistItems(items, container);
          }
      });

      // Append elements to card body
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardText);
      cardBody.appendChild(removeButton);

      // Append card body to card
      card.appendChild(cardBody);

      // Append card to container
      container.appendChild(card);
  });
}
