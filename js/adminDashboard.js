document.addEventListener("DOMContentLoaded", function () {
  const adminOverview = document.getElementById("adminOverview");
  const addBookForm = document.getElementById("addBookForm");
  const paginationContainer = document.getElementById("pagination");
  const itemsPerPage = 10;

  const fetchBooksJson = async () => {
    try {
      const response = await fetch("../Assets/books.json");
      const data = await response.json();
      displayData(data);
      saveDataToLocalStorage(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to save data to local storage
  const saveDataToLocalStorage = (data) => {
    localStorage.setItem("bookData", JSON.stringify(data));
  };

  // Function to load data from local storage
  const loadDataFromLocalStorage = () => {
    const data = localStorage.getItem("bookData");
    return data ? JSON.parse(data) : [];
  };

  // Fetch data when the page loads
  const fetchData = () => {
    const localData = loadDataFromLocalStorage();
    if (localData.length > 0) {
      displayData(localData);
    } else {
      fetchBooksJson();
    }
  };

  // Function to display data in the admin overview
  const displayData = (data, currentPage = 1) => {
    adminOverview.innerHTML = "";

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedData = data.slice(startIndex, endIndex);

    paginatedData.forEach((book, index) => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${book.title}</h5>
        <p class="card-text">
          Author: ${book.author}<br>
          Year: ${book.year}<br>
          Country: ${book.country}<br>
          Language: ${book.language}<br>
          Pages: ${book.pages}<br>
          Price: $${book.price.toFixed(2)}<br>
          Category: ${book.category}<br>
          <img src="${book.imageLink}" alt="${book.title}" class="img-fluid">
        </p>
        <button type="button" class="btn btn-danger" onclick="removeBook(${
          startIndex + index
        })">Remove</button>
      </div>
    `;

      adminOverview.appendChild(card);
    });

    updatePagination(data.length, currentPage);
  };

  window.removeBook = (index) => {
    const localData = loadDataFromLocalStorage();
    localData.splice(index, 1);
    updateData(localData);
  };

  const updateData = (data) => {
    const currentPage = getCurrentPage();
    displayData(data, currentPage);
    saveDataToLocalStorage(data);
  };

  addBookForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    //#URGENT: take into consideration that the new added item image not added into the local storage
    const newBook = {
      title: document.getElementById("title").value,
      author: document.getElementById("author").value,
      year: parseInt(document.getElementById("year").value, 10), // Add year field
      country: document.getElementById("country").value,
      imageLink: document.getElementById("imageLink").value, // Store the file object
      language: document.getElementById("language").value,
      pages: parseInt(document.getElementById("pages").value, 10),
      price: parseFloat(document.getElementById("price").value),
      category: document.getElementById("category").value,
    };

    const localData = loadDataFromLocalStorage();
    localData.push(newBook);
    updateData(localData);

    addBookForm.reset();
    document.getElementById("addBookModal").style.display = "none";
  });

  paginationContainer.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      const currentPage = parseInt(event.target.dataset.page, 10);
      const localData = loadDataFromLocalStorage();
      displayData(localData, currentPage);
    }
  });

  const updatePagination = (totalItems, currentPage) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const pageItem = document.createElement("li");
      pageItem.classList.add("page-item");
      const pageLink = document.createElement("a");
      pageLink.classList.add("page-link");
      pageLink.textContent = i;
      pageLink.href = "#";
      pageLink.dataset.page = i;

      if (i === currentPage) {
        pageItem.classList.add("active");
      }

      pageItem.appendChild(pageLink);
      paginationContainer.appendChild(pageItem);
    }
  };

  const getCurrentPage = () => {
    const hash = window.location.hash;
    return hash ? parseInt(hash.substring(1), 10) : 1;
  };

  fetchData();
});
