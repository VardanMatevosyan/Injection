const scriptElement = document.createElement('script');
const scriptUrl = chrome.runtime.getURL('/scripts/interceptRequest.js');
console.log('script url ' + scriptUrl);
scriptElement.src = scriptUrl;
document.body.appendChild(scriptElement);
