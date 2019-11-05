// popup.js

function loginMessageWithCredential(cred) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type:"loginAttempt", data: cred}, function(response){
      console.log('Received response from login attempt -- can do updates to popup with response: ', response);
    });
  });
}

function populateCredentials() {
  chrome.storage.sync.get(['credentials'], function (syncedCredentials) {
    console.log(syncedCredentials);
    let cred_list = $('#credential-list');
    for (let credential of syncedCredentials.credentials) {
      let li = document.createElement("li");
      li.append(document.createTextNode(credential.username));
      let button = document.createElement("button");
      // AMY: Added this here so that each button calls login with its own credential
      button.onclick = function () {
        loginMessageWithCredential(credential);
      };
      button.setAttribute('class', 'login-btn');
      button.innerHTML = "login";
      li.append(button);
      cred_list.append(li);
    }
  })
}

// function setEventListeners(e) {
//   console.log('setting event listeners in popup');
//   const loginBtn = e.target;
//   loginBtn.onclick = function () {
//     chrome.tabs.executeScript({
//       file: 'login.js'
//     });
//   }
// }

$(document).on('DOMContentLoaded', populateCredentials);


