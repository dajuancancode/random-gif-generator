const formField = document.querySelector('form');
const inputField = document.querySelector('#tagField');
const gifFrame = document.querySelector('iframe');
const errorEl = document.querySelector('.errorMessage');

formField.addEventListener('submit', e => {
  e.preventDefault();

  const tag = inputField.value;

  fetch(`/gif?tag=${tag}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        errorEl.textContent = data.error;
        gifFrame.src = data.sadGif;
      } else {
        errorEl.textContent = '';
        gifFrame.src = data.gifUrl;
      }
    });
  });
});
