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
      let mainView = $("#main-view")
      let panel = $('<div>').addClass('card panel');
      let templateString = $('<div class="panel-heading"><a class="collapsed card-link" data-toggle="collapse" href="#credentials'+collapseNum+'">'+acct[0]+'</a></div></div></div>')
      mainView.append(panel)
      panel.append(templateString)
      //create plan div
      // let panelHeader = document.createElement('div')
      // $(panelHeader).attr({'class': 'panel-heading'});
      // let text = document.createTextNode(acct[0]); 
      // panelHeader.append(text)
      // let panelLink = document.createElement('a')
      // $(panelLink).attr({'class': 'collapsed card-link', 'data-toggle': "collapse", 'href': "#credBody" + collapseNum})
      // panelLink.append(text)
      // panelHeader.append(panelLink)
      // panel.append(panelHeader)
      // create table and append to panel
      let credBody = $('<div>').attr({'id': "credentials" + collapseNum, 'class':'panel-body collapse show'})
      let table = $("<table>").addClass('table table-hover');
      credBody.append(table);
      panel.append(credBody);

      for (let cred of Object.entries(acct[1])) {
        // let thead = $($table).createTHead();
        // let row = thead.insertRow();

        let row = $('<tr>');
        row.append('<td class="td-name">'+cred[0]+'</td>')
        // addCell(row, cred[0]);
        table.append(row)

        //button
        $('<button/>', {
          type: 'button',
          class: 'btn login-btn',
          click: function() {
            let credential = {'username': cred[0], 'password': cred[1]['password'] }
            loginMessageWithCredential(credential);
          }
        }).append(loginSvg()).appendTo($('<td></td>').appendTo(row));

        // let button = document.createElement('button');
        // $(button).on('click', function () {
        //   let credential = {'username': cred[0], 'password': cred[1]['password'] }
        //   loginMessageWithCredential(credential);
        // });
        // $(button).attr({'class': 'btn login-btn' });
        // let td = row.insertCell();
        // td.append(button);
      }
      collapseNum++;
    }
  })
}

// helper function        
function addCell(tr, text) {
  // let td = tr.insertCell();
  // td.textContent = text;
  // $(td).attr({'class': 'td-name'})
  return tr.append('<tr class="td-name">'+text+'</tr>')
}

//svg
function loginSvg() {
  return $('<span><svg class="open-tab" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 87 87"><path class="cls-1" d="M41.82,63.71a30.62,30.62,0,1,1-.21,21.61l1-.32a29.59,29.59,0,1,0,.2-20.93Z" transform="translate(-35.5 -44.17)"></path><polygon class="cls-1" points="48.4 29.81 47.85 29.31 32.37 13.83 31.59 14.61 46.26 29.28 0 29.28 0 30.39 46.26 30.39 31.59 45.05 32.37 45.83 48.04 30.17 48.04 30.17 48.4 29.81"></polygon></svg></span>')
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


