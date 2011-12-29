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

        API_URI_AUTH = 'https://readitlaterlist.com/v2/auth',
        API_URI_ADD = 'https://readitlaterlist.com/v2/add';

    function isAuthenticated() {
        var result = (localStorage(KEY_IS_AUTH) == true);
        console.log("isAuthenticated: "+result);

        return result;
    }

    function authenticate(username, password, onSuccess, onInvalidCredentials, onError) {
        onSuccess = onSuccess || function(){};
        onInvalidCredentials = onInvalidCredentials || function(){};
        onError = onError || function(){};

        var data = { apikey: APIKEY, username: username, password: password};

        $.post(API_URI_AUTH, data)
            .success(function() {
                setAuthInfo(username, password);
                onSuccess();
            })
            .error(function(xhr, ajaxOptions, thrownError) {
                clearAuthInfo();

                if(xhr.status == 401) {
                        onInvalidCredentials();
                } else {
                        onError(xhr.status+': '+xhr.statusText);
                }
            });
    }

    function setAuthInfo(username, password) {
        localStorage[KEY_USERNAME] = username;
        localStorage[KEY_PASSWORD] = password;
        localStorage[KEY_IS_AUTH] = true;
    }

    function clearAuthInfo() {
        localStorage[KEY_USERNAME] = undefined;
        localStorage[KEY_PASSWORD] = undefined;
        localStorage[KEY_IS_AUTH] = undefined;
    }

    function addUrl(url, onSuccess, onForbidden, onError) {
        if(isAuthenticated() == false) {
            throw new Error("Not authenticated");
        }

        var cred = getCredentials();
        var data = { 'apikey': APIKEY, 'username': cred.username,
                     'password': cred.password, 'url': url};

        $.post(API_URI_ADD, data)
            .success(onSuccess)
            .error(function(xhr, ajaxOptions, thrownError) {
               if(xhr.status == STATUS_FORBIDDEN) {
                   clearAuthInfo();
                   onForbidden();
               } else {
                   onError(xhr.status+': '+xhr.statusText);
               }
            });
    }

    function getCredentials() {
        return { 'username': localStorage[KEY_USERNAME],
            'password': localStorage[KEY_PASSWORD] }
    }

    return {
        'isAuthenticated': isAuthenticated,
        'authenticate': authenticate,
        'addUrl': addUrl,
        'getCredentials': getCredentials
    }
} ());