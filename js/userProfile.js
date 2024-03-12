document.addEventListener("DOMContentLoaded", function () {
  // Function to handle file upload
  const handleFileUpload = () => {
    const fileInput = document.querySelector(".account-settings-fileinput");
    fileInput.click();

    fileInput.addEventListener("change", (event) => {
      const selectedFile = event.target.files[0];

      // Preview the selected image
      const previewImage = document.querySelector(".ui-w-80");
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImage.src = e.target.result;
      };
      reader.readAsDataURL(selectedFile);

      // Save the image file to the userProfile folder
      saveImageFile(selectedFile);
    });
  };

  // Function to save the image file to the userProfile folder
  const saveImageFile = (file) => {
    // Implement logic to handle saving the file to the server or any other actions
    // For demonstration, we'll use the File System API if available
    if (window.showDirectoryPicker) {
      // Use File System API if available (not supported in all browsers)
      showDirectoryPicker().then((directory) => {
        const path = `Assets/userProfile/${file.name}`;
        directory.getFileHandle(path, { create: true }).then((fileHandle) => {
          fileHandle.createWritable().then((writable) => {
            writable.write(file);
          });
        });
      });
    } else {
      // Handle saving file using alternative methods if File System API is not available
      console.log(
        "File System API not supported. Implement alternative logic here."
      );
    }
  };

  // Function to handle reset button
  const handleReset = () => {
    // Reset the file input and preview image
    const fileInput = document.querySelector(".account-settings-fileinput");
    const previewImage = document.querySelector(".ui-w-80");

    fileInput.value = "";
    previewImage.src = "../Assets/userProfile/dummy.png";
  };

  // Function to handle save changes button
  const handleSaveChanges = () => {
    // Implement logic to save changes to the server or perform any other actions
    const username = document.querySelector(".form-control.mb-1").value;
    const name = document.querySelector(".form-control").value;
    const email = document.querySelector(".form-control.mb-1").value;

    // Save data to local storage
    localStorage.setItem("username", username);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);

    console.log("Changes saved!");
    console.log("Username:", username);
    console.log("Name:", name);
    console.log("Email:", email);
  };

  // Function to handle cancel button
  const handleCancel = () => {
    // Implement logic to cancel changes or redirect as needed
    console.log("Changes canceled!");
  };

  // Event listeners
  document
    .querySelector(".btn-outline-primary")
    .addEventListener("click", handleFileUpload);
  document
    .querySelector(".btn-default.md-btn-flat")
    .addEventListener("click", handleReset);
  document
    .querySelector(".btn.btn-primary")
    .addEventListener("click", handleSaveChanges);
  document
    .querySelector(".btn.btn-default")
    .addEventListener("click", handleCancel);

  // Retrieve data from local storage on page load
  const storedUsername = localStorage.getItem("username");
  const storedName = localStorage.getItem("name");
  const storedEmail = localStorage.getItem("email");

  // Set the values if they exist in local storage
  if (storedUsername)
    document.querySelector(".form-control.mb-1").value = storedUsername;
  if (storedName) document.querySelector(".form-control").value = storedName;
  if (storedEmail)
    document.querySelector(".form-control.mb-1").value = storedEmail;
});
