const wrapper = document.querySelector(".wrapper");

const accessKey = "MQ5C-bR-XwJfxJWu5arGKUYGbNp35eojUf1pKyLHGQc";
const api = "https://api.unsplash.com/photos/random/?client_id=";

const uri = api + accessKey;

fetchUri(uri)

setInterval(()=> {
  fetchUri(uri)
},60000)

function fetchUri(uri) {
  fetch(uri)
    .then(response => response.json())
    .then(data => {
      const image = data;
      const img = document.createElement("img");
      img.setAttribute("src", `${image.urls.regular}`)
      wrapper.style.cssText = `background-image: url(${image.urls.regular})`;
    })
}