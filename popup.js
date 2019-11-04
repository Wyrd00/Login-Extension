// popup.js
// do I need to inject code into browser chrome.tabs.executeScript?

function setEventListeners() {
  console.log('setting event listeners in popup');
  const loginBtn = document.getElementById('login-btn');
  loginBtn.onclick = function () {
    chrome.tabs.executeScript({
      file: 'login.js'
    });    
  }
}

setEventListeners();