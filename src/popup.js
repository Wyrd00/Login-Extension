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
    const acctType_array = Object.entries(syncedCredentials.credentials)
    let collapseNum = 1;

    for (let acct of acctType_array) {
      let mainView = $("#main-view");
      //create plan div
      let panel = document.createElement('div')
      $(panel).attr({'class': 'card', 'id': 'panel'});
      let panelHeader = document.createElement('div')
      $(panelHeader).attr({'class': 'panel-heading'});
      let text = document.createTextNode(acct[0]); 
      panelHeader.append(text)
      let panelLink = document.createElement('a')
      $(panelLink).attr({'class': 'collapsed card-link', 'data-toggle': "collapse", 'href': "#credBody" + collapseNum})
      panelLink.append(text)
      panelHeader.append(panelLink)
      panel.append(panelHeader)
      // create table and append to panel
      let credBody = document.createElement('div');
      $(credBody).attr({'id': "credBody" + collapseNum, 'class':'credentials collapse show'})
      const table = document.createElement("table");
      $(table).attr({'class': 'table table-hover'});
      // panelHeader.append(table)
      credBody.append(table);
      panel.append(credBody);

      // helper function        
      function addCell(tr, text) {
        let td = tr.insertCell();
        td.textContent = text;
        $(td).attr({'class': 'td-name'})
        return td;
      }
      
      
      for (let cred of Object.entries(acct[1])) {
        let thead = table.createTHead();
        let row = thead.insertRow();
        addCell(row, cred[0]);

        //button
        $('<button/>', {
          type: 'button',
          class: 'btn login-btn btn-primary',
          click: function() {
            let credential = {'username': cred[0], 'password': cred[1]['password'] }
            loginMessageWithCredential(credential);
          }
        }).appendTo($('<td></td>').appendTo(row));

        // let button = document.createElement('button');
        // $(button).on('click', function () {
        //   let credential = {'username': cred[0], 'password': cred[1]['password'] }
        //   loginMessageWithCredential(credential);
        // });
        // $(button).attr({'class': 'btn login-btn' });
        // let td = row.insertCell();
        // td.append(button);
      }
      mainView.append(panel);
      collapseNum++;
    }
  })
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


