const toggleDropdown = (dropdownMenu) => {
  dropdownMenu.classList.toggle("show");
};

const closeDropdownOnClickOutside = (dropdownBtnSelector, dropdownMenu) => {
  window.onclick = function (event) {
    if (!event.target.matches(dropdownBtnSelector)) {
      if (dropdownMenu.classList.contains("show")) {
        dropdownMenu.classList.remove("show");
      }
    }
  };
};

const addDropdownEventListeners = (dropdownBtnSelector, dropdownMenu) => {
  document
    .querySelector(dropdownBtnSelector)
    .addEventListener("click", (event) => {
      event.stopPropagation();
      toggleDropdown(dropdownMenu);
    });

  closeDropdownOnClickOutside(dropdownBtnSelector, dropdownMenu);
};

const dropDownBtn = document.getElementById("sortDropdown");
const dropDownMenu = document.querySelector(".dropdown-menu");
addDropdownEventListeners("#sortDropdown", dropDownMenu);

const languageDropdownBtn = document.getElementById("languageDropdown");
const languageDropdownMenu = document.getElementById("language");
addDropdownEventListeners("#languageDropdown", languageDropdownMenu);
