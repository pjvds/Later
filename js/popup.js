$(document).ready(function() {
    var username = $('#username');
    var password = $('#password');
    var msg = $('#msg');

    var cred = ReadItLater.getCredentials();

    if(cred !== undefined) {
        username.val(cred.username);
        password.val(cred.password);
    }

    if(Notification.hasMessage()) {
        $('#msg').html(Notification.getMessage()).show();
    } else {
        $('#msg').hide();
    }
    
    $('#authForm').submit(function(e) {
        e.preventDefault();
        e.stopPropagation();

        // clear message from ui
        Notification.clearMessage();
        msg.text('');
        msg.hide(0);

        // get credentials and authenticate
        var user = username.val();
        var pass = password.val();
        LaterPageAction.authenticate(user, pass, function() {
            window.close();
        }, function() {
            notify('Invalid username or password!');
        }, function(error) {
            notify('error: '+error);
        });

        return false;
    })

    notify = function(text) {
        msg.visible().hide('fast');

        Notification.setMessage(text);
        msg.text(text);
        msg.show('fast');
    }
});

window.addEventListener("unload", function() {
    Notification.clearMessage();
}, false);