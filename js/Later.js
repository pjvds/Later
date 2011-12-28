var Later = function () {
    "use strict";

    var APIKEY = '4c5T9V85ga3c6J4a5adbyWoL25p0ypr2',
        STATUS = {
            OK: 200,
            CREATED: 201,
            BAD: 400,
            FORBIDDEN: 403,
            ERROR: 500
        };

    function authenticate(username, password, onSuccess, onError) {
        alert('starting to auth...');

//        var apiUrl = 'https://readitlaterlist.com/v2/auth';
//        var data = {
//            apikey : apikey,
//            username : username,
//            password : password
//        };
//
//        $.post(apiUrl, data)
//            .success(function() {
//                localStorage["username"] = username;
//                localStorage["password"] = password;
//                localStorage["isauthenticated"] = true;
//                onSuccess();
//                return true;
//            })
//            .error(function(e) {
//                _username = undefined;
//                _password = undefined;
//                onError(e);
//                return false;s
//            });
    }

    function isAuthenticated(onSuccess, onNoCredentatials, onError) {
//        if (localStorage["isauthenticated"] === true) {
//            return true;
//        }
//
//        // Clear auth flag.
//        localStorage["isauthenticated"] = undefined;
//
//        // If we have credentials, auth; otherwise raise credentials missing.
//        if(localStorage["username"] !== undefined && localStorage["password"] !== undefined) {
//            authenticate(localStorage["username"], localStorage["password"], function() {
//                localStorage["isauthenticated"] = true;
//                if(onSuccess) onSuccess();
//                return true;
//            }, function() {
//                if(onError) onError();
//                return false;
//            })
//        } else {
//            // No credentials found to auth with.
//            if(onNoCredentatials) onNoCredentatials();
//            return false;
//        }
    }

    function add(url, onSuccess, onAuthFirst, onError) {
        if (!isAuthenticated()) {
            // Invoke auth required callback; if exits.
            if (onAuthFirst) { onAuthFirst(); }
            return;
        }

        var apiUrl = 'https://readitlaterlist.com/v2/add',
            data = {
            apikey : APIKEY,
            username : localStorage['Later.username'],
            password : localStorage['Later.password'],
            url : url };

        $.post(apiUrl, data).complete(function(reg) {
            switch(reg.status){
                case STATUS.OK:
                    localStorage['Later.isauthenticated'] = true;
                    if(onSuccess) { onSuccess(); }
                    break;
                case STATUS.FORBIDDEN:
                    localStorage['Later.isauthenticated'] = undefined;
                    if(onAuthFirst) { onAuthFirst(reg); }
                    break;
                case STATUS.ERROR:
                    localStorage['Later.isauthenticated'] = undefined;
                    if(onError) { onError(reg); }
                    break;
            }
        });
    }
};