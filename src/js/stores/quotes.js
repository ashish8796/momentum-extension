// Uri for requesting quote of the day
const quoteUri = "http://quotes.rest/qod.json?category=inspire";
const quoteElem = document.querySelector(".quote");

// Quotes realted variable

export const fetchUri = () => {fetch(quoteUri)
  .then(response => response.json())
  .then(data => {
    let quote = data.contents.quotes[0].quote;
    quoteElem.innerText = `"${quote}"`;
  })
}

fetchUri()

