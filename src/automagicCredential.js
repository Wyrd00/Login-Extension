function saveStorageCredentials(cred) {
  console.log(cred);
  let { acctType, username, password } = cred;
  chrome.storage.sync.get('credentials', function(c) {
    const syncedCredentials = c.credentials;
    syncedCredentials[acctType][username] = {'password': password};
    chrome.storage.sync.set({'credentials': syncedCredentials}, function() {
      console.log('Credentials saved');
    });
  });
}

function setListeners() {
  let submitButton = $('#signup-form button.submit');
  let regForm = $('#signup-form form.registration-form');

  regForm.on('submit', function(e) {
    e.preventDefault();
    let username = regForm.find('.email-address input').val();
    let password = regForm.find('div.password input').val();
    saveStorageCredentials({acctType: 'unknown', username, password});

//  when storage is ready, we will sync login values into accounts
//  may need to do a follow up operation to get its account type after the page refreshes
  });
}
setListeners();