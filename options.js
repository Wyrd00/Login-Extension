function handleSubmit() {
  let credentialsForm = $('#credentials-form');

  credentialsForm.on('submit', function (e) {
    e.preventDefault();
    let userName = credentialsForm.find('input[name]="username"');
    let password = credentialsForm.find('input[name]="password');
  });


  chrome.storage.local.set({
    username: 'shitbag'
  }, function (e) {
    console.log('value is ' + shitbag);
  })

};

function restoreOptions() {
  chrome.storage.sync.get({
    // username and password
  }, function (c) {
    
  }
}

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