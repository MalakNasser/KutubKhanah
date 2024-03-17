const itemsPerPage = 20;
let currentPage = 1;
let books = [];
allBooks = [];
let totalPages = 0;
const categorySelector = document.getElementById("category-selection");
const minInput = document.getElementById("min-price");
const maxInput = document.getElementById("max-price");
const languageDropdown = document.getElementById("language");

const getBooks = () => {
  fetch("../Assets/books.json")
    .then((response) => response.json())
    .then((data) => {
      allBooks = data;
      books = data;

      populateCategories(allBooks);
      populateLanguageDropdown(allBooks);
      initializePriceRangeInputs(allBooks);

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
    totalPages = Math.ceil(books.length / itemsPerPage);
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

document.addEventListener("DOMContentLoaded", async function () {
  const searchBtn = document.querySelector(".btn-yellow");
  searchBtn.addEventListener("click", () => {
    const searchWord = document.getElementById("search").value;
    searchBooks(searchWord);
  });
});

//Populate Categorization And Filtration
function populateCategories(data) {
  const categories = [...new Set(data.map((book) => book.category))].sort(
    (a, b) => a.localeCompare(b)
  );
  categorySelector.innerHTML = categories
    .map((category) => `<h6 class="clickable-header">${category}</h6>`)
    .join("");

  const categoryElements = document.querySelectorAll("#category-selection h6");
  categoryElements.forEach((element) => {
    element.addEventListener("click", () => {
      const category = element.textContent.trim();
      filterDataByCategory(category);
      categoryElements.forEach((el) => (el.style.color = ""));
      element.style.color = "rgb(255, 208, 0)";
    });
  });
}

function populateLanguageDropdown(booksData) {
  const languages = [...new Set(booksData.map((book) => book.language))].sort(
    (a, b) => a.localeCompare(b)
  );
  languages.forEach((language) => {
    const item = document.createElement("li");
    item.classList.add("dropdown-item");
    item.textContent = language;
    languageDropdown.appendChild(item);

    item.addEventListener("click", () => {
      document.getElementById("languageDropdown").innerText = language;
    });
  });
}
document.getElementById("language").addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    filterDataByLanguage(event.target.textContent);
  }
});

function initializePriceRangeInputs(booksData) {
  const prices = booksData.map((book) => book.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  minInput.setAttribute("min", minPrice);
  maxInput.setAttribute("max", maxPrice);
  minInput.setAttribute("value", minPrice);
  maxInput.setAttribute("value", maxPrice);
}

minInput.addEventListener("input", () => {
  const minPrice = parseFloat(minInput.value);
  const maxPrice = parseFloat(maxInput.value);
  if (!isNaN(minPrice) && !isNaN(maxPrice)) {
    filterByPriceRange(minPrice, maxPrice);
  }
});

maxInput.addEventListener("input", () => {
  const minPrice = parseFloat(minInput.value);
  const maxPrice = parseFloat(maxInput.value);
  if (!isNaN(minPrice) && !isNaN(maxPrice)) {
    filterByPriceRange(minPrice, maxPrice);
  }
});

//Category, Language, Price Filter, Search
let activeFilters = {
  language: null,
  price: null,
  category: null,
  searchWord: null,
};

function applyAllFilters() {
  books = allBooks;

  if (activeFilters.category) {
    books = books.filter((book) => book.category === activeFilters.category);
  }

  if (activeFilters.language) {
    books = books.filter((book) => book.language === activeFilters.language);
  }

  if (activeFilters.price) {
    books = books.filter(
      (book) =>
        book.price >= activeFilters.price.min &&
        book.price <= activeFilters.price.max
    );
  }

  if (activeFilters.searchWord) {
    console.log(activeFilters.searchWord);
    books = books.filter((book) => {
      const bookTitle = book.title.toLowerCase();
      return bookTitle.includes(activeFilters.searchWord.toLowerCase());
    });
    console.log(books);
  }

  currentPage = 1;
  displayBooks(currentPage);
  createPaginationButtons();
}

function filterDataByLanguage(language) {
  activeFilters.language = language;
  applyAllFilters();
}

function filterByPriceRange(min, max) {
  activeFilters.price = { min, max };
  applyAllFilters();
}

function filterDataByCategory(category) {
  activeFilters.category = category;
  applyAllFilters();
}

function searchBooks(word) {
  activeFilters.searchWord = word;
  applyAllFilters();
}

document.getElementById("clearLanguageFilter").addEventListener("click", () => {
  document.getElementById("languageDropdown").innerText = "Filter by Language";
  activeFilters.language = null;
  applyAllFilters();
});

document.getElementById("clearPriceFilter").addEventListener("click", () => {
  const prices = allBooks.map((book) => book.price);
  minInput.value = Math.min(...prices);
  maxInput.value = Math.max(...prices);
  activeFilters.price = null;
  applyAllFilters();
});

document.getElementById("Reset").addEventListener("click", () => {
  activeFilters = {
    language: null,
    price: null,
    category: activeFilters.category,
  };
  document.getElementById("languageDropdown").innerText = "Filter by Language";
  applyAllFilters();
});

//Sorting
function sortBooks(option) {
  sortBy = option;
  switch (option) {
    case "titleAsc":
      books.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "titleDesc":
      books.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "priceAsc":
      books.sort((a, b) => a.price - b.price);
      break;
    case "priceDesc":
      books.sort((a, b) => b.price - a.price);
      break;
    default:
      break;
  }
  currentPage = 1;
  displayBooks(currentPage);
  createPaginationButtons();
}

document.querySelectorAll(".sort-option").forEach((item) => {
  item.addEventListener("click", (event) => {
    const sortOption = item.getAttribute("data-sort");

    if (sortOption === "default") {
      sortBooks("titleAsc");
      document.getElementById("sortDropdown").innerText = "Sort by";
    } else {
      sortBooks(sortOption);
      document.getElementById("sortDropdown").innerText = item.innerText;
    }
  });
});

getBooks();
