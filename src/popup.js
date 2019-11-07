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
    
    for (let acct of acctType_array) {
      let mainView = $("#main-view");
      //create plan div
      let panel = document.createElement('div')
      let heading = document.createElement('h4')
      let text = document.createTextNode(acct[0]); 
      heading.append(text)
      panel.append(heading)
      // create table and append to panel
      const table = document.createElement("table");
      panel.append(table)

      // helper function        
      function addCell(tr, text) {
        let td = tr.insertCell();
        td.textContent = text;
        return td;
      }
      
      for (let cred of Object.entries(acct[1])) {
        let thead = table.createTHead();
        let row = thead.insertRow();
        addCell(row, cred[0]);

        //button
        let button = document.createElement("button");
        $(button).on('click', function () {
          let credential = {'username': cred[0], 'password': cred[1]['password'] }
          loginMessageWithCredential(credential);
        });
        button.setAttribute('class', 'login-btn');
        button.innerHTML = "login";
        let td = row.insertCell();
        td.append(button)
      }
      mainView.append(panel);
    }
  })
}
    // let credList = $('.panel');
    // let panelHeading = $('.panel-heading'); //basic, premium, admin
    // let panelBody = document.createElement(div)


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


