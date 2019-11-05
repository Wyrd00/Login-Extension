// popup.js

function populateCredentials() {
  chrome.storage.sync.get(['credentials'], function (syncedCredentials) {
    console.log(syncedCredentials);
    let cred_list = $('#credential-list')
    for (let credential of syncedCredentials.credentials) {
      let li = document.createElement("li");
      li.append(document.createTextNode(credential.username));
      let button = document.createElement("button");
      button.setAttribute('class', 'login-btn');
      button.innerHTML = "login";
      li.append(button);
      cred_list.append(li)
    }
  })
}

function setEventListeners(e) {
  console.log('setting event listeners in popup');
  const loginBtn = e.target
  loginBtn.onclick = function () {
    chrome.tabs.executeScript({
      file: 'login.js'
    });
  }
}

$(document).on('DOMContentLoaded', populateCredentials);
$(document).on('click', '.login-btn', setEventListeners);