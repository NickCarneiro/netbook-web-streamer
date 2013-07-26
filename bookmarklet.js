javascript: var img = document.createElement('script');
var currentUrl = document.location.href;
var apiUrl = 'http://localhost:3000/loadUrl?url=' + currentUrl;
img.setAttribute('src', apiUrl);
document.body.appendChild(img);