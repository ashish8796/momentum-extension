const wrapper = document.querySelector(".wrapper");

// const accessKey = "MQ5C-bR-XwJfxJWu5arGKUYGbNp35eojUf1pKyLHGQc";
const api = "https://source.unsplash.com/1600x900/?nature"
;

const uri = api;

fetchUri(uri)

setInterval(()=> {
  fetchUri(uri)
},60000)

function fetchUri(uri) {
  fetch(uri)
    .then(response => {
      wrapper.style.cssText = `background-image: url(${response.url})`;
    })
}