// popup.js

function loginMessageWithCredential(cred) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type:"loginAttempt", data: cred}, function(response){
      console.log('Received response from login attempt -- can do updates to popup with response: ', response);
    });
  });
}

function populateCredentials() {
  chrome.storage.sync.get(['credentials'], function (syncedCredentials) {
    const acctType_array = Object.entries(syncedCredentials.credentials);
    let collapseNum = 1;

    for (let acct of acctType_array) {
      let mainView = $("#main-view");
      let panel = $('<div>').addClass('card panel');
      let panelHeader = $('<div class="panel-heading"><a class="collapsed card-link" data-toggle="collapse" href="#credentials'+collapseNum+'">'+acct[0]+'</a></div></div></div>');
      let panelBody = $('<div>').attr({'id': "credentials" + collapseNum, 'class':'panel-body collapse show'});
      let table = $("<table>").addClass('table table-hover');

      mainView.append(panel);
      panel.prepend(panelHeader).append(panelBody);
      panelBody.append(table);

      for (let cred of Object.entries(acct[1])) {
        let row = $('<tr>');
        row.append('<td class="td-name">'+cred[0]+'</td>');
        table.append(row);

        //button
        $('<button/>', {
          type: 'button',
          class: 'btn login-btn',
          click: function() {
            let credential = {'username': cred[0], 'password': cred[1]['password'] };
            loginMessageWithCredential(credential);
          }
        }).append(loginSvg()).appendTo($('<td></td>').appendTo(row));
      }
      collapseNum++;
    }
  })
}

//svg
function loginSvg() {
  return $('<span><svg class="open-tab" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 87 87"><path class="cls-1" d="M41.82,63.71a30.62,30.62,0,1,1-.21,21.61l1-.32a29.59,29.59,0,1,0,.2-20.93Z" transform="translate(-35.5 -44.17)"></path><polygon class="cls-1" points="48.4 29.81 47.85 29.31 32.37 13.83 31.59 14.61 46.26 29.28 0 29.28 0 30.39 46.26 30.39 31.59 45.05 32.37 45.83 48.04 30.17 48.04 30.17 48.4 29.81"></polygon></svg></span>');
}
// function setEventListeners(e) {
//   console.log('setting event listeners in popup');
//   const loginBtn = e.target;
//   loginBtn.onclick = function () {
//     chrome.tabs.executeScript({
//       file: 'login.js'
//     });
//   }
// }

$(document).on('DOMContentLoaded', populateCredentials);