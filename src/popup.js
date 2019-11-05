// popup.js

function loginMessageWithCredential(cred) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    console.log(cred)
    chrome.tabs.sendMessage(tabs[0].id, {type:"loginAttempt", data: cred}, function(response){
      console.log('Received response from login attempt -- can do updates to popup with response: ', response);
    });
  });
}

function populateCredentials() {
  chrome.storage.sync.get(['credentials'], function (syncedCredentials) {
    let cred_list = $('#credential-list');
    const acctType_array = Object.entries(syncedCredentials.credentials)
    for (let acct of acctType_array) {
      console.log(acct)
      let ul = document.createElement("ul");
      ul.append(document.createTextNode(acct[0]));
      for (let cred of Object.entries(acct[1])) {
        console.log(cred)
        let li = document.createElement("li");
        li.append(document.createTextNode(cred[0]));
        let button = document.createElement("button");
        // AMY: Added this here so that each button calls login with its own credential
        $(button).on('click', function () {
          loginMessageWithCredential(cred);
        });
        button.setAttribute('class', 'login-btn');
        button.innerHTML = "login";
        li.append(button);
        ul.append(li)
      }
      cred_list.append(ul);
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


