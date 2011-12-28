var ReadItLater = ( function () {
    "use strict";

    var APIKEY = '4c5T9V85ga3c6J4a5adbyWoL25p0ypr2',
        STATUS_OK = 200,
        STATUS_CREATED = 201,
        STATUS_BAD = 400,
        STATUS_FORBIDDEN = 403,
        STATUS_ERROR = 500,
        KEY_IS_AUTH = 'Later.isAuth',
        currentTabId;

    function backgroundInit() {
        var handleTab = function(tab) {
            currentTabId = tab.id || tab;
        };


    }

    function updateCurrentTabId(tab) {
        currentTabId = tab.id || tab;
    }

    function isAuthenticated() {
        alert('isAuthenticated');
        return localStorage(KEY_IS_AUTH) !== undefined;
    }

    function authenticate(username, password) {
        alert('authenticate');
    }
} ());