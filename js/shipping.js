
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const fullNameInput = document.getElementById("fullName");
    const addressInput = document.getElementById("address");
    const cityInput = document.getElementById("city");
    const zipcodeInput = document.getElementById("zipcode");
    const deliveryDateInput = document.getElementById("deliveryDate");
    const additionalNotesInput = document.getElementById("additionalNotes");

    function handleSubmit(event) {
      event.preventDefault(); // Prevent default form submission

      const fullName = fullNameInput.value.trim();
      const address = addressInput.value.trim();
      const city = cityInput.value.trim();
      const zipcode = zipcodeInput.value.trim();
      const deliveryMethod = document.querySelector('input[name="deliveryMethod"]:checked').value;
      const deliveryDate = deliveryDateInput.value;
      const additionalNotes = additionalNotesInput.value.trim();

      // Validation
      if (!fullName || !address || !city || !zipcode) {
        alert("Please fill out all required fields.");
        return;
      }

      const shippingInfo = {
        fullName,
        address,
        city,
        zipcode,
        deliveryMethod,
        deliveryDate,
        additionalNotes,
      };

      // Store shipping info in localStorage
      localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));

      form.reset();
    }

    form.addEventListener("submit", handleSubmit);

    const savedShippingInfo = localStorage.getItem("shippingInfo");
    if (savedShippingInfo) {
      const parsedShippingInfo = JSON.parse(savedShippingInfo);
      fullNameInput.value = parsedShippingInfo.fullName;
      addressInput.value = parsedShippingInfo.address;
      cityInput.value = parsedShippingInfo.city;
      zipcodeInput.value = parsedShippingInfo.zipcode;
      deliveryDateInput.value = parsedShippingInfo.deliveryDate;
      additionalNotesInput.value = parsedShippingInfo.additionalNotes;
      document.getElementById(parsedShippingInfo.deliveryMethod + "Delivery").checked = true;
    }
  });
