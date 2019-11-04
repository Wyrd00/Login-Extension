//  Login.js 
// Could use this file to run as a content-script, which injects js into the page
// might need to use jquery style get -- seems like content scripts not able to access
// apis directly other than the limited one -- might need to address. 


function getCredentials() {
    console.log('getcred')

    chrome.storage.sync.get(['credentials'], function (c) {
        console.log(c)
        let first_credential = c.credentials[0]
        const loginFormData = populateFormDataLogin(first_credential);
        login(loginFormData);
    });
}

async function login(loginFormData) {
    try {
        makeRequest('/api/login', 'POST', loginFormData)
            .then((posts) => {
                console.log('success', posts)
                // window.location.href = window.location.href;
            })
            .catch((err) => {
                console.log('err...', err)
            })
    //   let response = await fetch('/api/login', loginFormData);
    //   alert(response);
    //   if (response.data.status === "1") {
    //       window.location.href = window.location.href;
    //     }
    }
    catch (err) {
      alert(err)
    }
  }

function makeRequest (url, method, loginFormData) {
    var request = new XMLHttpRequest();
	return new Promise(function (resolve, reject) {
        request.onreadystatechange = function () {
            if (request.readyState !== 4) return;
            if (request.status >= 200) {
                resolve(request)
            } else {
                reject({
                    status: request.status,
                    statusText: request.statusText
                })
            }
        }
		request.open(method, url, true);
		request.send(loginFormData);
    })
}

function populateFormDataLogin(c) {
    let bodyFormData = new FormData();
    bodyFormData.set("username", c.username);
    bodyFormData.set("password", c.password);
    bodyFormData.set("remember", 1);
    bodyFormData.set("__redirect", window.location.href);
    bodyFormData.set("jsfinished", 1);
    bodyFormData.set("gdprOptIn", 1);
    // unable to get csrfToken :( ...investigate
    bodyFormData.set("csrfToken", 'c490b300d7ba0d63179a3811a25ea451cb08c01de573b9a794b494556196a5ca');
    return bodyFormData;
}

getCredentials()
