fetch('https://en.wikipedia.org/wiki/Fairy_Tales_Told_for_Children._First_Collection')
  .then(response => response.text())
  .then(html => {
    // Parse the HTML content
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Find all <p> elements within the mw-content-ltr class
    const paragraphs = doc.querySelectorAll('.mw-parser-output .mw-content-ltr p');

    // Extract the inner HTML content of each <p> element
    paragraphs.forEach(p => {
      console.log(p.innerHTML);
    });
  })
  .catch(error => console.error('Error:', error));