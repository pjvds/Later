var ReadItLater = ( function () {
    "use strict";

    var APIKEY = '4c5T9V85ga3c6J4a5adbyWoL25p0ypr2',
        STATUS_OK = 200,
        STATUS_CREATED = 201,
        STATUS_BAD = 400,
        STATUS_FORBIDDEN = 403,
        STATUS_ERROR = 500,
        KEY_IS_AUTH = 'Later.isAuth',
        KEY_USERNAME = 'Later.username',
        KEY_PASSWORD = 'Later.password',

        API_URI_AUTH = 'https://readitlaterlist.com/v2/auth';

    function isAuthenticated() {
        return localStorage(KEY_IS_AUTH) !== undefined;
    }

    function authenticate(username, password, onSuccess, onInvalidCredentials, onError) {
        onSuccess = onSuccess || function(){};
        onInvalidCredentials = onInvalidCredentials || function(){};
        onError = onError || function(){};

        var data = { apikey: APIKEY, username: username, password: password};

        $.post(API_URI_AUTH, data)
            .success(function() {
                localStorage[KEY_USERNAME] = username;
                localStorage[KEY_PASSWORD] = password;
                localStorage[KEY_IS_AUTH] = true;

                onSuccess();
            })
            .error(function(xhr, ajaxOptions, thrownError) {
                localStorage[KEY_USERNAME] = undefined;
                localStorage[KEY_PASSWORD] = undefined;
                localStorage[KEY_IS_AUTH] = undefined;

                if(xhr.status == 401) {
                        onInvalidCredentials();
                } else {
                        onError(xhr.status+': '+xhr.statusText);
                }
            });
    }

    function addUrl(url) {
        alert('add url!');

        if(isAuthenticated() == false) {
            throw new Error("Not authenticated");
        }
    }

    return {
        'isAuthenticated': isAuthenticated,
        'authenticate': authenticate
    }
} ());