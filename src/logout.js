chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        switch(message.type) {
            case "logout":
                logout();
                sendResponse('heres a response from login');
                break;
            default:
                sendResponse('unknown action type');
                break;
        }
    }
);