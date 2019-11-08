const currentUser = $('.user-menu .email-avatar span').text();
const premiumLabelDisplay = $('.user-menu .premium-label').css('display');
const adminLinks = $('.admin-links');
const UNKNOWN = 'unknown';
let accountType;

if (adminLinks.length) {
    accountType = 'admin';
}
else if (premiumLabelDisplay !== 'none') {
    accountType = 'premium';
}
else {
    accountType = 'basic';
}

console.log(currentUser, accountType);
chrome.storage.sync.get(['credentials'], function (c) {
    let syncedCredentials = c.credentials;
    console.log(syncedCredentials);
    if (syncedCredentials[UNKNOWN][currentUser]) {
        syncedCredentials[accountType][currentUser] = syncedCredentials[UNKNOWN][currentUser];
        delete syncedCredentials[UNKNOWN][currentUser];
        chrome.storage.sync.set({'credentials': syncedCredentials}, function () {
            console.log('Moved an unknown');
        });
    }
});