document.addEventListener("DOMContentLoaded", function () {
    const addToWishlistButtons = document.querySelectorAll('.icon-heart');
    const showDetailsButtons = document.querySelectorAll('.show-details-btn');
  
    // Add click event listener to all "Add to Wishlist" buttons
    addToWishlistButtons.forEach(button => {
      button.addEventListener('click', function (event) {
        const heartIcon = event.currentTarget.querySelector('i.fa-heart');
        const bookElement = event.currentTarget.closest('.book');
        const bookTitle = bookElement.querySelector('#bookTitle').textContent;
  
        if (heartIcon.classList.contains('active')) {
          removeFromWishlist(bookTitle);
          heartIcon.classList.remove('active');
        } else {
          addToWishlist(bookTitle);
          heartIcon.classList.add('active');
        }
      });
    });
  
    // Add click event listener to all "Show Details" buttons
    showDetailsButtons.forEach(button => {
      button.addEventListener('click', function () {
        const bookElement = button.closest('.book');
        const bookTitle = bookElement.querySelector('#bookTitle').textContent;
  
        // Fetch the JSON file containing book details
        fetch('../Assets/books.json')
          .then(response => response.json())
          .then(data => {
            // Find the book details based on the title
            const bookDetails = data.find(book => book.title === bookTitle);
            
            if (bookDetails) {
              // Redirect to view-book.html and pass book details
              localStorage.setItem('bookDetails', JSON.stringify(bookDetails));
              window.location.href = '../pages/view-book.html';
            } else {
              // Handle case where book details are not found
              console.error(`Book details not found for title: ${bookTitle}`);
            }
          })
          .catch(error => console.error('Error fetching book details:', error));
      });
    });
  
    // Function to add book to wishlist
    function addToWishlist(title) {
      let addedToWishlist = JSON.parse(localStorage.getItem("addedToWishlist")) || [];
      const existingItemIndex = addedToWishlist.findIndex(item => item.title === title);
      if (existingItemIndex === -1) {
        addedToWishlist.push({ title });
        localStorage.setItem("addedToWishlist", JSON.stringify(addedToWishlist));
      }
    }
  
    // Function to remove book from wishlist
    function removeFromWishlist(title) {
      let addedToWishlist = JSON.parse(localStorage.getItem("addedToWishlist")) || [];
      const indexToRemove = addedToWishlist.findIndex(item => item.title === title);
      if (indexToRemove !== -1) {
        addedToWishlist.splice(indexToRemove, 1);
        localStorage.setItem("addedToWishlist", JSON.stringify(addedToWishlist));
      }
    }
  
    // Check wishlist items and toggle active class on heart icons
    function checkWishlistItems() {
      const addedToWishlist = JSON.parse(localStorage.getItem("addedToWishlist")) || [];
      addToWishlistButtons.forEach(button => {
        const bookTitle = button.closest('.book').querySelector('#bookTitle').textContent;
        if (addedToWishlist.some(item => item.title === bookTitle)) {
          button.querySelector('i.fa-heart').classList.add('active');
        } else {
          button.querySelector('i.fa-heart').classList.remove('active');
        }
      });
    }
  
    // Initial check and setup
    checkWishlistItems();
  });
  