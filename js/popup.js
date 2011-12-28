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
            notify('Invalid username or password!');
        }, function(error) {
            notify('error: '+error);
        });

        e.preventDefault();
        e.stopPropagation();
        return false;
    });

    notify = function(text) {
        msg.text(text).show();
    }
});