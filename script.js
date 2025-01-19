
document.addEventListener('DOMContentLoaded', () => {
  const quoteContainer = document.querySelector('#quote-container');
  const quoteText = document.querySelector('#quote');
  const quoteAuthor = document.querySelector('#author');
  const twitterBtn = document.querySelector('#twitter');
  const newQuoteBtn = document.querySelector('#new-quote');
  const loader = document.querySelector('#loader');

  // ---------- hide loader ----------
  function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
  }

  // ---------- show loader ----------
  function removeLoadingSpinner() {
    if (!loader.hidden) {
      quoteContainer.hidden = false;
      loader.hidden = true;
    }
  }

  // ---------- get quote from api Url and Render on Browser ----------
  const getQuote = async () => {
    showLoadingSpinner();
    const apiUrl = 'https://quotes-api-self.vercel.app/quote';
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data)
      data.quote.length > 80 ?
        quoteText.classList.add('long-quote') :
        quoteText.classList.remove('long-quote');
      quoteText.textContent = data.quote;
      data.author === '' ? quoteAuthor.textContent = 'unknown' : quoteAuthor.textContent = ` - ${data.author}`;
    }
    catch (error) {
      console.log('error while getting quotes from api', error);
      quoteText.textContent = 'Could not fetch quote. Please try again.';
      quoteAuthor.textContent = ''
    }
    removeLoadingSpinner();
  }

  // ---------- tweet quote to twitter ----------
  function tweetQuote() {
    const quote = quoteText.textContent;
    const author = quoteAuthor.textContent;
    const twitterUrl = `http://twitter.com/intent/tweet?text=${quote}${author}`;
    window.open(twitterUrl, '_blank');
  }

  // ---------- Call getQuote on page load ----------
  getQuote();
  newQuoteBtn.addEventListener('click', getQuote);
  twitterBtn.addEventListener('click', tweetQuote);
});


//----------------------------------------------------------------------------------------
// fetch('https://quotes-api-self.vercel.app/quote')
//   .then(res => res.json())
//   .then(data => console.log(data))
//   .catch(error => console.log(error))