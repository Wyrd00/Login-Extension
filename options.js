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
    const new_cred = {'username': userName, 'password': password};
    saveStorageCredentials(new_cred)
  });
};

function saveStorageCredentials(new_cred) {
  try {
    chrome.storage.sync.get('credentials', function(c) {
      const list_of_credentials = c.credentials
      list_of_credentials.push(new_cred)
      chrome.storage.sync.set({'credentials': list_of_credentials}, function() {
        console.log('Credentials saved')
        getStorageCredentials()
        alert('Credentials saved')
      })
    }) 
  } catch (err) {
      console.log('err...' + err)
  }
}

function getStorageCredentials() {
  chrome.storage.sync.get(['credentials'], function (c) {
      console.log(c);
  })
}

$(document).on('DOMContentLoaded', getStorageCredentials);
handleSubmit()