chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({
    credentials: []
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

chrome.commands.onCommand.addListener(function (command) {
  console.log('Command:', command);
  if (command === 'toggle-login') {
    console.log('logging in from keypress');
    chrome.tabs.executeScript({
      file: 'login.js'
    });
  }
});

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