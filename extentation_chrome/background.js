chrome.webRequest.onHeadersReceived.addListener(
    function(details) {
      var url = details.url;
      if (url.startsWith('http://') || url.startsWith('https://')) {
        if (url.indexOf('?code') !== -1 && url.indexOf('localhost:8081') !== -1) {
          // Extract the code from the URL
          var queryString = url.split('?')[1];
          var parameters = new URLSearchParams(queryString);
          var authorizationCode = parameters.get('code');
          if (authorizationCode) {
            let counter = +localStorage.getItem("counter");
            if (counter === 0) {
              console.log("setting counter to 2")
              counter = 2;
              localStorage.setItem("counter", counter+"");
            } else {
              counter = counter + 1;
              localStorage.setItem("counter", counter+"");
            }
            console.log("counter " + counter)
            if (counter === 2 || counter % 2 === 0) {
              console.log("Send authorization code")
              const domain = url.split('?')[0];
              const tabId = details.tabId;
              console.log('domain is ' + domain)
              sendAuthorizationCode(authorizationCode, domain, tabId);
            }
          }
        }
      }
    },
    {urls: ["<all_urls>"]},
    ["responseHeaders"]
);


function sendAuthorizationCode(authorizationCode, domain, tabId) {
  fetch('http://localhost:8777/auth/code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ code: authorizationCode })
  })
  .then(response => {
    console.log('Authorization code sent successfully');
    let counter = +localStorage.getItem("counter");
    if (counter === 2 || counter % 2 === 0) {
      console.log("Redirect to home page")
      chrome.tabs.update(tabId, { url: domain });
    }
    console.log("Response Status " + response.status);
  })
  .catch(error => {
    console.error('Error sending authorization code:', error);
  });
}




