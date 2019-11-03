function handleSubmit() {
  let credentialsForm = $('#credentials-form');

  credentialsForm.on('submit', function (e) {
    e.preventDefault();
    let userName = $('input[name="username"]').val();
    let password = $('input[name="password"]').val();
    chrome.storage.sync.set({'username': userName, 'password', password}, function() {
      console.log('credentials saved')
      getCredentials()
    })
  });
};

function getCredentials() {
  chrome.storage.sync.get(['username', 'password'], function (c) {
      console.log(c);
  })
}


function restoreOptions() {
  chrome.storage.sync.get(['username', 'password'], function (c) {
    console.log(c);
  });
}


$(document).on('DOMContentLoaded', restoreOptions);
handleSubmit()