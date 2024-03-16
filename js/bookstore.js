const itemsPerPage = 20;
let currentPage = 1;

fetch("../Assets/books.json")
  .then((response) => response.json())
  .then((data) => {
    const totalPages = Math.ceil(data.length / itemsPerPage);

    function displayBooks(page) {
      document.querySelector(".books").innerHTML = "";

      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = page * itemsPerPage;

      for (let i = startIndex; i < endIndex && i < data.length; i++) {
        const book = data[i];

        const bookElement = document.createElement("div");
        bookElement.classList.add(
          "book",
          "col-2",
          "mb-4",
          "me-4",
          "d-flex",
          "flex-column",
          "justify-content-between",
          "align-items-center",
          "p-3"
        );

        bookElement.innerHTML = `
                    <div class="book-image-container">
                        <img src="${book.imageLink}" class="img-fluid" alt="">
                        <button class="icon-heart">
                            <i class="fa fa-heart"></i>
                        </button>
                    </div>
                    <p id="bookTitle">${book.title}</p>
                    <p id="bookPrice">${book.price}$</p>
                    <a href="../pages/view-book.html" class="btn">Show Details</a>
                `;

        document.querySelector(".books").appendChild(bookElement);
      }
    }

    function createPaginationButtons() {
      const paginationContainer = document.querySelector(".pagination");
      paginationContainer.innerHTML = "";

      if (currentPage > 1) {
        const prevButton = document.createElement("button");
        prevButton.innerHTML = '<i class="fa fa-arrow-left"></i>';
        prevButton.classList.add("pagination-button");
        prevButton.addEventListener("click", () => {
          currentPage--;
          displayBooks(currentPage);
          createPaginationButtons();
        });
        paginationContainer.appendChild(prevButton);
      }

      for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.classList.add("pagination-button");
        if (i == currentPage) {
          button.classList.add("selected-page");
        }
        button.addEventListener("click", () => {
          currentPage = i;
          displayBooks(currentPage);
          createPaginationButtons();
        });
        paginationContainer.appendChild(button);
      }

      if (currentPage < totalPages) {
        const nextButton = document.createElement("button");
        nextButton.innerHTML = '<i class="fa fa-arrow-right"></i>';
        nextButton.classList.add("pagination-button");
        nextButton.addEventListener("click", () => {
          currentPage++;
          displayBooks(currentPage);
          createPaginationButtons();
        });
        paginationContainer.appendChild(nextButton);
      }
    }

    displayBooks(currentPage);
    createPaginationButtons();
  })
  .catch((error) => console.error("Error fetching JSON:", error));
