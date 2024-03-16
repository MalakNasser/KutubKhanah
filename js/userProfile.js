document.addEventListener("DOMContentLoaded", function () {
  const handleFileUpload = () => {
    const fileInput = document.querySelector(".account-settings-fileinput");
    fileInput.click();

    fileInput.addEventListener("change", (event) => {
      const selectedFile = event.target.files[0];

      const previewImage = document.querySelector(".ui-w-80");
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImage.src = e.target.result;
      };
      reader.readAsDataURL(selectedFile);

      saveImageFile(selectedFile);
    });
  };

  const saveImageFile = (file) => {
    if (window.showDirectoryPicker) {
      showDirectoryPicker().then((directory) => {
        const path = `Assets/userProfile/${file.name}`;
        directory.getFileHandle(path, { create: true }).then((fileHandle) => {
          fileHandle.createWritable().then((writable) => {
            writable.write(file);
          });
        });
      });
    } else {
      console.log(
        "File System API not supported. Implement alternative logic here."
      );
    }
  };

  const handleReset = () => {
    const fileInput = document.querySelector(".account-settings-fileinput");
    const previewImage = document.querySelector(".ui-w-80");

    fileInput.value = "";
    previewImage.src = "../Assets/userProfile/dummy.png";
  };

  const handleSaveChanges = () => {
    const username = document.querySelector(".form-control.mb-1").value;
    const name = document.querySelector(".form-control").value;
    const email = document.querySelector(".form-control.mb-1").value;

    localStorage.setItem("username", username);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);

    console.log("Changes saved!");
    console.log("Username:", username);
    console.log("Name:", name);
    console.log("Email:", email);
  };

  const handleCancel = () => {
    console.log("Changes canceled!");
  };

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

  const storedUsername = localStorage.getItem("username");
  const storedName = localStorage.getItem("name");
  const storedEmail = localStorage.getItem("email");

  if (storedUsername)
    document.querySelector(".form-control.mb-1").value = storedUsername;
  if (storedName) document.querySelector(".form-control").value = storedName;
  if (storedEmail)
    document.querySelector(".form-control.mb-1").value = storedEmail;
});
