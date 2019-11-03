function handleSubmit() {
  let credentialsForm = $('#credentials-form');

  credentialsForm.on('submit', function (e) {
    e.preventDefault();
    let userName = $('input[name="username"]').val();
    let password = $('input[name="password"]').val();
    if (!userName || !password) {
      alert('Please input username and password');
      return;
    }
    chrome.storage.sync.set({'username': userName, 'password': password}, function() {
      console.log('credentials saved')
      getCredentials()
      alert('Credentials saved')
    })
  });
};

function getCredentials() {
  chrome.storage.sync.get(['username', 'password'], function (c) {
      console.log(c);
  })
}


// function restoreOptions() {
//   chrome.storage.sync.get(['username', 'password'], function (c) {
//     console.log(c);
//   });
// }

// let page = document.getElementById('buttonDiv');
// const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];
// function constructOptions(kButtonColors) {
//   for (let item of kButtonColors) {
//     let button = document.createElement('button');
//     button.style.backgroundColor = item;
//     button.addEventListener('click', function() {
//       chrome.storage.sync.set({color: item}, function() {
//         console.log('color is ' + item);
//       })
//     });
//     page.appendChild(button);
//   }
// }
// constructOptions(kButtonColors);

$(document).on('DOMContentLoaded', restoreOptions);
handleSubmit()