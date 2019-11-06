console.log('inside updateUnknown.js');
const currentUser = $('.user-menu .email-avatar span').text();
const tryPremiumDiv = $('header.reorg .upgrade-link');
const UNKNOWN = 'unknown';
let accountType;

tryPremiumDiv.length ? accountType = 'basic' : accountType = 'premium';

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