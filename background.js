chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({greeting: 'yo'}, function() {
      console.log('The username is hello');
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {urlContains: 'education.com'},
          })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
  });

  chrome.commands.onCommand.addListener(function(command) {
    console.log('Command:', command);
  });

//   chrome.runtime.onMessage.addListener((msg, sender, response) => {
//     switch (msg.type) {
//         case 'login':
//             response(tabStorage[msg.tabId]);
//             break;
//         default:
//             response('unknown request');
//             break;
//     }
// });