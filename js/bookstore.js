const itemsPerPage = 20;
let currentPage = 1;
let books = [];
allBooks = [];
let totalPages = 0;

const getBooks = () => {
  fetch("../Assets/books.json")
    .then((response) => response.json())
    .then((data) => {
      allBooks = data;
      books = data;
      totalPages = Math.ceil(books.length / itemsPerPage);
      displayBooks(currentPage);
      createPaginationButtons();
    })
    .catch((error) => console.error("Error fetching JSON:", error));
};

function displayBooks(page) {
  document.querySelector(".books").innerHTML = "";

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;

  for (let i = startIndex; i < endIndex && i < books.length; i++) {
    const book = books[i];

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
      "p-3",
      "text-center"
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
                <button class="btn">Show Details</button>
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

const searchBooks = (word) => {
  const wordInLowerCase = word.toLowerCase();
  books = allBooks.filter((book) => {
    bookTitle = book.title.toLowerCase();
    return bookTitle.includes(wordInLowerCase);
  });
  totalPages = Math.ceil(books.length / itemsPerPage);

  displayBooks(currentPage);
  createPaginationButtons();
};

document.addEventListener("DOMContentLoaded", async function () {
  const searchBtn = document.querySelector(".btn-yellow");
  searchBtn.addEventListener("click", () => {
    const searchWord = document.getElementById("search").value;
    searchBooks(searchWord);
  });
});

getBooks();

// fetch("../Assets/books.json")
//   .then((response) => response.json())
//   .then((data) => {
//     const totalPages = Math.ceil(books.length / itemsPerPage);
//     books = data;

// function displayBooks(page) {
//   document.querySelector(".books").innerHTML = "";

//   const startIndex = (page - 1) * itemsPerPage;
//   const endIndex = page * itemsPerPage;

//   for (let i = startIndex; i < endIndex && i < books.length; i++) {
//     const book = books[i];

//     const bookElement = document.createElement("div");
//     bookElement.classList.add(
//       "book",
//       "col-2",
//       "mb-4",
//       "me-4",
//       "d-flex",
//       "flex-column",
//       "justify-content-between",
//       "align-items-center",
//       "p-3",
//       "text-center"
//     );

//     bookElement.innerHTML = `
//                 <div class="book-image-container">
//                     <img src="${book.imageLink}" class="img-fluid" alt="">
//                     <button class="icon-heart">
//                         <i class="fa fa-heart"></i>
//                     </button>
//                 </div>
//                 <p id="bookTitle">${book.title}</p>
//                 <p id="bookPrice">${book.price}$</p>
//                 <button class="btn">Show Details</button>
//             `;

//     document.querySelector(".books").appendChild(bookElement);
//   }
// }

// function createPaginationButtons() {
//   const paginationContainer = document.querySelector(".pagination");
//   paginationContainer.innerHTML = "";

//   if (currentPage > 1) {
//     const prevButton = document.createElement("button");
//     prevButton.innerHTML = '<i class="fa fa-arrow-left"></i>';
//     prevButton.classList.add("pagination-button");
//     prevButton.addEventListener("click", () => {
//       currentPage--;
//       displayBooks(currentPage);
//       createPaginationButtons();
//     });
//     paginationContainer.appendChild(prevButton);
//   }

//   for (let i = 1; i <= totalPages; i++) {
//     const button = document.createElement("button");
//     button.textContent = i;
//     button.classList.add("pagination-button");
//     if (i == currentPage) {
//       button.classList.add("selected-page");
//     }
//     button.addEventListener("click", () => {
//       currentPage = i;
//       displayBooks(currentPage);
//       createPaginationButtons();
//     });
//     paginationContainer.appendChild(button);
//   }

//   if (currentPage < totalPages) {
//     const nextButton = document.createElement("button");
//     nextButton.innerHTML = '<i class="fa fa-arrow-right"></i>';
//     nextButton.classList.add("pagination-button");
//     nextButton.addEventListener("click", () => {
//       currentPage++;
//       displayBooks(currentPage);
//       createPaginationButtons();
//     });
//     paginationContainer.appendChild(nextButton);
//   }
// }

// displayBooks(currentPage);
// createPaginationButtons();
// })
// .catch((error) => console.error("Error fetching JSON:", error));
