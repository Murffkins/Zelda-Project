// get data from local storage
function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

const favorites = getLocalStorage("favorites");

favorites.forEach(record => {
    const markup = `<li><a href="/record.html?id=${record.Id}">${record.Name}</a></li>`
    let unorderedList = document.querySelector('ul');
    if (unorderedList) {
      unorderedList.insertAdjacentHTML('beforeend', markup);
    }
})