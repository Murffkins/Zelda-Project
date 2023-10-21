 async function loadTemplate(path) {
    const response = await fetch(path);
    const html = await response.text()  
  
    const template = document.createElement('template');
    template.innerHTML = html;
    return template;
  }
 
 function renderWithTemplate(template, parentElement, data, callback) {
    parentElement.insertAdjacentHTML("afterbegin", template.innerHTML);
    if (callback) {
      callback(data);
    }
    
  }

 async function loadHeaderFooter() {
    const header = await loadTemplate("/header.html")
    const footer = await loadTemplate("/footer.html");
    const domHeader = document.getElementById("header");
    const domFooter = document.getElementById("footer");
    renderWithTemplate(header, domHeader);  
    renderWithTemplate(footer, domFooter);
  }

loadHeaderFooter();


