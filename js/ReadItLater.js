var ReadItLater = ( function () {
    "use strict";

    var APIKEY = '4c5T9V85ga3c6J4a5adbyWoL25p0ypr2',
        STATUS_OK = 200,
        STATUS_FORBIDDEN = 401,

        KEY_IS_AUTH = 'Later.isAuth',
        KEY_USERNAME = 'Later.username',
        KEY_PASSWORD = 'Later.password',
        IS_AUTH_VALUE = '1',

        API_URI_AUTH = 'https://readitlaterlist.com/v2/auth',
        API_URI_ADD = 'https://readitlaterlist.com/v2/add';

    function isAuthenticated() {
        var result = (localStorage[KEY_IS_AUTH] == IS_AUTH_VALUE);
        console.log("isAuthenticated: "+result);

        return result;
    }

    function authenticate(username, password, onSuccess, onInvalidCredentials, onError) {
        onSuccess = onSuccess || function(){};
        onInvalidCredentials = onInvalidCredentials || function(){};
        onError = onError || function(){};

        var data = { apikey: APIKEY, username: username, password: password};

        $.ajaxSetup({async:false});
        $.post(API_URI_AUTH, data).complete(function(xhr) {
                switch(xhr.status) {
                    case STATUS_OK:
                        setAuthInfo(username, password);
                        onSuccess();
                        break;
                    case STATUS_FORBIDDEN:
                        clearAuthInfo();
                        onInvalidCredentials();
                        break;
                    default:
                        onError(xhr.status+': '+xhr.statusText);
                }
            });
    }

    function setAuthInfo(username, password) {
        localStorage[KEY_USERNAME] = username;
        localStorage[KEY_PASSWORD] = password;
        localStorage[KEY_IS_AUTH] = IS_AUTH_VALUE;
    }

    function clearAuthInfo() {
        localStorage.removeItem(KEY_USERNAME);
        localStorage.removeItem(KEY_PASSWORD);
        localStorage.removeItem(KEY_IS_AUTH);
    }

    function addUrl(url, onSuccess, onForbidden, onError) {
        if(isAuthenticated() == false) {
            throw new Error("Not authenticated");
        }

        var cred = getCredentials();
        var data = { 'apikey': APIKEY, 'username': cred.username,
                     'password': cred.password, 'url': url};

        $.ajaxSetup({async:false});
        $.post(API_URI_ADD, data).complete(function(xhr) {
                switch(xhr.status) {
                    case STATUS_OK:
                        onSuccess();
                        break;
                    case STATUS_FORBIDDEN:
                        clearAuthInfo();
                        onForbidden();
                        break;
                    default:
                        onError(xhr.status+': '+xhr.statusText);
                }
            });
    }

    function getCredentials() {
        if(localStorage[KEY_USERNAME] !== undefined && localStorage[KEY_PASSWORD] !== undefined) {
            return { 'username': localStorage[KEY_USERNAME],
                'password': localStorage[KEY_PASSWORD] }
        } else {
            return undefined;
        }
    }

    return {
        'isAuthenticated': isAuthenticated,
        'authenticate': authenticate,
        'addUrl': addUrl,
        'getCredentials': getCredentials
    }
} ());