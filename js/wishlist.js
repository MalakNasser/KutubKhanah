function addToWishlist(title, description, author, price, imageUrl) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist.push({ title: title, description: description, author: author, price: price, imageUrl: imageUrl });
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    displayWishlist();
  }

  function removeFromWishlist(index) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist.splice(index, 1);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    displayWishlist();
  }

  function displayWishlist() {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    let wishlistAside = document.getElementById("wishlistAside");
    wishlistAside.innerHTML = "";
    if (wishlist.length === 0) {
      wishlistAside.innerHTML += "<p>No items in wishlist.</p>";
    } else {
      wishlist.forEach((item, index) => {
        wishlistAside.innerHTML += `
          <div class="card mb-3">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${item.imageUrl}" class="img-fluid rounded-start" alt="${item.title}">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${item.title}</h5>
                  <p class="card-text">Description: ${item.description}</p>
                  <p class="card-text">Author: ${item.author}</p>
                  <p class="card-text">Price: ${item.price}</p>
                  <button class="btn btn-danger btn-sm" onclick="removeFromWishlist(${index})">Remove from Wishlist</button>
                </div>
              </div>
            </div>
          </div>
        `;
      });
    }
  }

  displayWishlist();