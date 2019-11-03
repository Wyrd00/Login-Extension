// popup.js
// do I need to inject code into browser chrome.tabs.executeScript?

function setEventListeners() {
  $('#login-btn').on('click', function() {
    loginUsingStorage();
  });
}

function loginUsingStorage () {
  console.log('inside popup.js');

  chrome.storage.sync.get(['username', 'password'], function (c) {
    const loginFormData = populateFormDataLogin(c);
    login(loginFormData);
  });
}

// might need to add in headers
async function login(loginFormData) {
  try {
    let response = $.post('/api/login', loginFormData, {headers: {'Content-Type': 'multipart/form-data'}});
    console.log(response);
    if (response.data.status === "1") {
        window.location.href = window.location.href;
      }
  }
  catch {
    console.log('something unexpected happened')
  }
}

function populateFormDataLogin(c) {
  const bodyFormData = new FormData();
  bodyFormData.set("username", c.username);
  bodyFormData.set("password", c.password);
  bodyFormData.set("remember", 1);
  bodyFormData.set("__redirect", window.location.href);
  bodyFormData.set("jsfinished", 1);
  bodyFormData.set("gdprOptIn", 1);
  bodyFormData.set("csrfToken", window.Edu.csrfToken);
  return bodyFormData;
}

setEventListeners();

// changeColor.onclick = function(element) {
//     let color = element.target.value;
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//       chrome.tabs.executeScript(
//           tabs[0].id,
//           {code: 'document.body.style.backgroundColor = "' + color + '";'});
//     });
//   };