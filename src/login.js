//  Login.js 

function attemptLoginFromCredential(cred) {
    try {
        // const cred = getFirstCredential();
        const loginFormData = populateFormDataLogin(cred);
        login(loginFormData);
    }
    catch (err) {
        console.log("Error: ", err);
    }
}

// function getFirstCredential() {
//     console.log('retrieving first credential');
//     let firstCredential;
//     chrome.storage.sync.get(['credentials'], function (c) {
//         console.log(c);
//         firstCredential = c.credentials[0];
//     });
//     console.log('first credential is ', firstCredential);
//     return firstCredential;
// }

async function login(loginFormData) {
    const response = await makeRequest('/api/login', 'POST', loginFormData);
    console.log('success', response);
    chrome.runtime.sendMessage({type: 'login'});
}

function makeRequest(url, method, loginFormData) {
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
        };
        request.open(method, url, true);
        request.send(loginFormData);
    })
}

function populateFormDataLogin(c) {
    csrfInput = document.getElementById('extension-csrf');
    let bodyFormData = new FormData();
    bodyFormData.set("username", c.username);
    bodyFormData.set("password", c.password);
    bodyFormData.set("remember", 1);
    bodyFormData.set("__redirect", window.location.href);
    bodyFormData.set("jsfinished", 1);
    bodyFormData.set("gdprOptIn", 1);
    bodyFormData.set("csrfToken", csrfInput.value);
    return bodyFormData;
}

chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        switch(message.type) {
            case "loginAttempt":
                attemptLoginFromCredential(message.data);
                sendResponse('heres a response from login');
                break;
            default:
                sendResponse('unknown action type');
                break;
        }
    }
);