let submitButton = $('#signup-form button.submit');
let regForm = $('#signup-form form.registration-form');
console.log('in automagic js');

regForm.on('submit', function(e) {
  e.preventDefault();
  console.log('in automagic js2');
  let username = regForm.find('.email-address input').val();
  let password = regForm.find('div.password input').val();
  console.log(username, password, 'automagic 8');
//  when storage is ready, we will sync login values into accounts
//  may need to do a follow up operation to get its account type after the page refreshes
});
