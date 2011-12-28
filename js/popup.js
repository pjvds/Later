$(document).ready(function() {
    var username = $('#username');
    var password = $('#password');
    var msg = $('#msg');

    msg.hide();

    $('#authForm').submit(function(e) {
        var user = username.val();
        var pass = password.val();

        ReadItLater.authenticate(user, pass, function() {
            window.close();
        }, function() {
            msg.text('Invalid username or password!').show();
        }, function(error) {
            msg.text('error: '+error).show();
        });

        e.preventDefault();
        e.stopPropagation();
        return false;
    });
});

//  var form =    document.getElementById('authForm'),
//      user    = document.getElementById('username'),
//      pass    = document.getElementById('password'),
//      auth;
//
//  username.value = localStorage['username'] || "";
//  password.value = localStorage['password'] || "";
//
//  form.addEventListener( 'submit', function ( e ) {
//      alert('posting...');
//
//      Later.authenticate(user.value, pass.value,
//          function() {
//              alert('AUTH 200!');
//          },
//          function() {
//              alert("ERROR!@#");
//          });
//
//      return false;
//  } );