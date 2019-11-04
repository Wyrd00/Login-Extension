function handleSubmit() {
  let credentialsForm = $('#credentials-form');

  credentialsForm.on('submit', function (e) {
    e.preventDefault();
    let userName = $('input[name="username"]').val();
    let password = $('input[name="password"]').val();
    if (!userName || !password) {
      alert('Missing username or password');
      return;
    }
    chrome.storage.sync.set({'username': userName, 'password': password}, function() {
      console.log('storage success -- add something to options html page to confirm');
    });
  });
};

function getStorageCredentials() {
  chrome.storage.sync.get(['username', 'password'], function (c) {
      console.log(c);
  })
}

$(document).on('DOMContentLoaded', getStorageCredentials);
handleSubmit()