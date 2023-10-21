let params = (new URL(document.location)).searchParams;
let category = params.get("category");
let id = params.get('id');
let entry = null;



// fetch("https://zelda.fanapis.com/api/" + category + "/" + id)
fetch("https://botw-compendium.herokuapp.com/api/v3/compendium/entry/" + id)
    .then(res => {
        return res.json();
    })
    .then(data => {
    //   console.log(data);

      entry = data;
    // let markup = `<li>Name: ${data.data.name}</li>`;
    let markup = `<li><img id="record-image" src='${data.data.image}' /></li>`;

    if (data.data.image){
        // markup+= `<li><img src='${data.data.image}' /></li>`;
        markup+= `<li><b><u>Name:</u></b> ${data.data.name}</li>`;
    }
    
    if (data.data.description){
        markup+= `<li><b><u>Description:</u></b> ${data.data.description}</li>`;
    }

    if (data.data.common_locations) {
        markup += '<li><b><u>Common Locations:</u></b><ul>';
        data.data.common_locations.forEach(element => {
            markup += "<li>" + element + "</li>";
        });
        markup += '</ul></li>';
    }
    
    if (data.data.cooking_effect){
        markup+= `<li><b><u>Cooking Effect:</u></b> ${data.data.cooking_effect}</li>`;
    }

    if (data.data.edible){
        markup+= `<li><b>Edible:</b> ${data.data.edible}</li>`;
    }

    if (data.data.hearts_recovered != undefined){
        markup+= `<li><b><u>Hearts Recovered:</u></b> ${data.data.hearts_recovered}</li>`;
    }

    if (data.data.properties) {
        markup += '<li><b><u>Properties:</u></b><ul>';
        if (data.data.properties.attack != undefined) {
            markup += "<li><b><u>Attack:</u></b>" + data.data.properties.attack + "</li>";
        }
        if (data.data.properties.defense != undefined) {
            markup += "<li><b><u>Defense:</u></b>" + data.data.properties.defense + "</li>";
        }
        markup += '</ul></li>';
    }

    // "Drops:" still appears even if it is empty
    if (data.data.drops != undefined) { 
        markup += '<li><b><u>Drops:</u></b><ul>';
        data.data.drops.forEach(element => {
            markup += "<li>" + element + "</li>";
        });
        markup += '</ul></li>';
    }
    
    

    // if (data.data.creatures){
    //     markup+= `<li>Creature: ${data.data.creatures}</li>`;
    // }
    
    // if (data.data.developer){
    //     markup+= `<li>Developer: ${data.data.developer}</li>`;
    // }

    // if (data.data.publisher){
    //     markup+= `<li>Publisher: ${data.data.publisher}</li>`;
    // }

    // if (data.data.released_date){
    //     markup+= `<li>Release Date: ${data.data.released_date}</li>`;
    // }

    // if (data.data.gender){
    //     markup+= `<li>Gender: ${data.data.gender}</li>`;
    // }

    // if (data.data.race){
    //     markup+= `<li>Race: ${data.data.race}</li>`;
    // }

    let unorderedList = document.querySelector('ul');
    if (unorderedList) {
        unorderedList.insertAdjacentHTML('beforeend', markup);
    }
    })
    .catch(error => console.log(error));



function addFavorite() {
    addToFavorites(entry);
    const heartItems = getLocalStorage("favorites");
    console.log(heartItems);
}
    
function removeFavorite() {
    removeProductFromFavorites(entry.data.id);
    const heartItems = getLocalStorage("favorites");
    console.log(heartItems);
}
    
// save data to local storage
function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

// set a listener for both touchend and click
function setClick(selector, callback) {
    qs(selector).addEventListener("touchend", (event) => {
      event.preventDefault();
      callback();
    });
    qs(selector).addEventListener("click", callback);
  }


function removeProductFromFavorites(productId) {
const favItems = getLocalStorage("favorites");
const itemIndex = favItems.findIndex(item => item.Id === productId);
if (itemIndex !== -1) {
    favItems.splice(itemIndex, 1);
    localStorage.setItem("favorites", JSON.stringify(favItems));
}
}

function addToFavorites(record) {
this.favoriteArray = getLocalStorage("favorites") || [];
let search = this.favoriteArray.find((item) => item.Id === record.data.id);

if (search === undefined) {
    this.favoriteArray.push({
        Id: record.data.id,
        Name: record.data.name,
    });
}

setLocalStorage("favorites", this.favoriteArray);
}

// get data from local storage
function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

// addFavorite();
