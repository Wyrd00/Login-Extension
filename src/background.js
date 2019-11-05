// INITS
chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({
    credentials: {basic: {}, premium: {}, admin: {}}
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
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        const newUrl = tabs[0].url + "/?__logout";
        console.log(newUrl);
        chrome.tabs.update(tabs[0].id, {url: newUrl}, function (tab) {
            console.log('logged out of tab: ', tab);
        });
    });
}

// KEYPRESS COMMANDS
chrome.commands.onCommand.addListener(function (command) {
    console.log('Command:', command);
    switch (command) {
        case 'toggle-login':
            // TODO: get a credential from sync and pass it through as cred
            loginMessageWithCredential(cred);
            break;
        case 'toggle-logout':
            logoutAndRefresh();
            break;
        default:
            console.log('command not linked to an action yet');
            break;
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