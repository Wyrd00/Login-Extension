// INITS
chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({
    credentials: {basic: {}, premium: {}, admin: {}, unknown: {}}
  }, function () {
    console.log('why hello there!');
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {
            urlContains: 'education.com'
          },
        })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

function loginMessageWithCredential(cred) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "loginAttempt", data: cred}, function (response) {
            console.log('Received response from login attempt -- can do updates to popup with response: ', response);
        });
    });
}

function logoutAndRefresh() {

    console.log('logout and refresh');

    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "logoutAttempt"}, function (response) {
            console.log('logout boi', response);
        });
    });
}

function getCredentialByType(type) {
    chrome.storage.sync.get(['credentials'], function (c) {
        let syncedCredentials = c.credentials;
        console.log(syncedCredentials, syncedCredentials[type], Object.keys(syncedCredentials[type])[0]);

        let firstCred = syncedCredentials[type][Object.keys(syncedCredentials[type])[0]];
        if (firstCred !== undefined) {
            return firstCred;
        }
        throw `no credentials found of type ${type}.`
    });
}

function getBasicCred() {
    return getCredentialByType('basic');
}

function getPremiumCred() {
    return getCredentialByType('premium');
}

function getAdminCred() {
    return getCredentialByType('admin');
}

function switchCommand(command) {
    console.log('Command:', command);
    switch (command) {
        case 'toggle-logout':
            logoutAndRefresh();
            break;
        case 'toggle-basic':
            loginMessageWithCredential(getBasicCred());
            break;
        case 'toggle-premium':
            let cred = getPremiumCred();
            loginMessageWithCredential(cred);
            break;
        case 'toggle-admin':
            loginMessageWithCredential(getAdminCred());
            break;
        default:
            console.log('command not linked to an action yet');
            break;
    }
}

// KEYPRESS COMMANDS
chrome.commands.onCommand.addListener(function (command) {
    try {
        switchCommand(command);
    }
    catch(err) {
        console.log(err);
    }
});

// REFRESH AFTER LOGIN
chrome.runtime.onMessage.addListener((message, sender, response) => {
    switch (message.type) {
        case 'login':
            chrome.tabs.reload(function () {
                console.log('Set icon for new login type here');
            });
            break;
        default:
            console.log('unknown request');
            break;
    }
});