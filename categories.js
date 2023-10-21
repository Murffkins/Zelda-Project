let params = (new URL(document.location)).searchParams;
let category = params.get("category");


// fetch("https://zelda.fanapis.com/api/" + category + "?limit=50")
fetch("https://botw-compendium.herokuapp.com/api/v3/compendium/category/" + category)
    .then(res => {
        return res.json();
    })
    .then(data => {
      console.log(data);
       data.data.forEach(record => {
        const markup = `<li><a href="/record.html?category=${category}&id=${record.id}">${record.name}</a></li>`
        let unorderedList = document.querySelector('ul');
        if (unorderedList) {
          unorderedList.insertAdjacentHTML('beforeend', markup);
        }
      });
    })
    .catch(error => console.log(error));

fetch("https://botw-compendium.herokuapp.com/api/v3/compendium/category/" + category)
    .then(res => {
        return res.json();
    })
    .then(data => {
        console.log(data);
    })
