document.addEventListener('DOMContentLoaded', function() {
  var generatePasswordButton = document.getElementById('generatePassword');
  var passwordDisplay = document.getElementById('passwordDisplay');

  generatePasswordButton.addEventListener('click', function() {
    var password = generateRandomPassword();
    passwordDisplay.textContent = 'Generated Password: ' + password;
  });
});

function generateRandomPassword() {
  var length = 12;
  var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var password = "";
  for (var i = 0; i < length; ++i) {
    var randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}
