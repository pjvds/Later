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
        msg.html(Notification.getMessage()).show();
    } else {
        msg.hide();
    }
    
    $('#authForm').submit(function(e) {
        Notification.clearMessage();
        msg.hide();

        var user = username.val();
        var pass = password.val();

        LaterPageAction.authenticate(user, pass, function() {
            window.close();
        }, function() {
            notify('Invalid username or password!');
        }, function(error) {
            notify('error: '+error);
        });

        e.preventDefault();
        e.stopPropagation();
        return false;
    })

    notify = function(text) {
        Notification.setMessage(text);
        msg.text(text).show();
    }
});

window.addEventListener("unload", function() {
    Notification.clearMessage();
}, false);