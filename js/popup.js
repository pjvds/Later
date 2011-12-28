window.addEventListener( 'load', function() {
  var form =    document.getElementById('authForm'),
      user    = document.getElementById('username'),
      pass    = document.getElementById('password'),
      auth;

  username.value = localStorage['username'] || "";
  password.value = localStorage['password'] || "";

  form.addEventListener( 'submit', function ( e ) {
      alert('posting...');

      Later.authenticate(user.value, pass.value,
          function() {
              alert('AUTH 200!');
          },
          function() {
              alert("ERROR!@#");
          });

      return false;
  } );
})