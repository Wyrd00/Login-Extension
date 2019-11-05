function setListeners() {
  const credentialsForm = $('#credentials-form');
  credentialsForm.on('submit', function (e) {
    try {
      const cred = getCredentialsFromForm(e);
      saveStorageCredentials(cred);
    }
    catch (err){
      console.log("Error: ", err);
    }
  });
}

function getCredentialsFromForm(e) {
    e.preventDefault();
    let userName = $('input[name="username"]').val();
    let password = $('input[name="password"]').val();
    let acctType = $('select[name="acctType"]').val();
    if (!userName || !password || !acctType) {
      throw 'missing username or password';
    }
    return {'acctType': acctType, 'username': userName, 'password': password};
};

function saveStorageCredentials(cred) {
    let { acctType, username, password } = cred;
    chrome.storage.sync.get('credentials', function(c) {
      const syncedCredentials = c.credentials;
      syncedCredentials[acctType][username] = password
      chrome.storage.sync.set({'credentials': syncedCredentials}, function() {
        console.log('Credentials saved');
      });
    });
}

function getStorageCredentials() {
  chrome.storage.sync.get(['credentials'], function (c) {
      console.log(c);
  })
}

// $(document).on('DOMContentLoaded', getStorageCredentials);
setListeners();