const request = new Request('http://127.0.0.1:5500/novios.json');

fetch(request)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response;
  })
  .then((response) => {
    document.getElementById('test').innerHTML = response;
  });