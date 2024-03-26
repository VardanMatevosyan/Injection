const clientId = 'YOUR CLIENT ID';
const authorizeUrl = 'YOUR authorize/ ENDPOINT';
const tokenUrl = 'YOUR oauth/token ENDPOINT';

const authLink = document.getElementById('auth');

authLink.addEventListener('click', function(event) {
  event.preventDefault();
  console.log('User clicked on the link!');
  let hrefValue = authLink.href;
  // let codeChallenge = generateCodeChallenge()
  // hrefValue = hrefValue + '&code_challenge=' + codeChallenge + '&code_challenge_method=S256'
  window.location.href = hrefValue;
  console.log("href value " + hrefValue);
});


async function handleInterception() {
  const currentUrl = window.location.href;
  const urlParams = new URLSearchParams(currentUrl.split('?')[1]);
  const codeValue = urlParams.get('code');
  if (codeValue !== null) {
    console.log("Code is " + codeValue);
    // getTokenAjax(codeValue);
    await getTokenFetch(codeValue);
    getUserInfo()
    .then(userInfo => {
      console.log('UserInfo dto ' + JSON.stringify(userInfo, null, 2));
      let bodyElement = document.getElementsByTagName("body")[0];
      let pElement = document.createElement("p");
      pElement.textContent = 'Email ' + userInfo.email + ', Address '
        + userInfo.address;
      bodyElement.appendChild(pElement);
    });

  }
}

window.onload = handleInterception;

function authorize() {
  console.log('authorize request');
  const authorizeParams = getAuthorizeParams();
  console.log("authorize redirect_uri param " + authorizeParams.redirect_uri);
  const queryString = new URLSearchParams(authorizeParams);
  const url = authorizeUrl + '?' + queryString;
  let authTag = document.getElementById('auth');
  authTag.setAttribute('href', url);
  console.log("HREF " + url);
}

function getAuthorizeParams() {
  return {
    response_type: 'code',
    client_id: clientId,
    redirect_uri: 'http://localhost:8081/',
    scope: 'openid email profile offline_access',
    state: 'xyzABC123'
  }
}

// code_challenge: generateCodeChallenge(),
// code_challenge_method: 'S256'

async function getTokenFetch(codeValue) {
  // Define the request data
  const requestData = new URLSearchParams();
  requestData.append('grant_type', 'authorization_code');
  requestData.append('client_id', clientId);
  requestData.append('code', codeValue);
  requestData.append('redirect_uri', 'http://localhost:8081/');

  // let codeVerifier = localStorage.getItem("code_verifier");
  // requestData.append('code_verifier', codeVerifier);

  await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: requestData
  })
  .then(response => {
    return response.json();
  })
  .then(data => {
    localStorage.setItem('id_token', data.id_token);
    console.log("token response " + JSON.stringify(data));
    console.log("token id_token " + data.id_token);
    return data.id_token;
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

async function getUserInfo() {
  const idToken = localStorage.getItem("id_token")

  try {
    const response = await fetch("http://localhost:9777/user-info", {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + idToken
      }
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }

}

function getTokenAjax(codeValue) {
  $.ajax({
    url: tokenUrl,
    scriptCharset: 'UTF-8',
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: {
      grant_type: 'authorization_code',
      client_id: clientId,
      code: codeValue,
      redirect_uri: 'http://localhost:8081/',

    },
    error: function (error) {
      console.log(error)
    },
    success: function (response) {
      localStorage.setItem('id_token', response.id_token);
      console.log("token id_token " + response.id_token)
    }
  });
}
